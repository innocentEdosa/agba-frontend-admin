import {
  COMPLETE_VIDEO_UPLOAD,
  GET_PRE_SIGNED_TA_URLS,
  GET_PRE_SIGNED_URLS,
  iNITIALIZE_VIDEO_UPLOAD,
} from "../constants/endpoints";
import htttp from "../htttp";

export type OnProgressFnType = ({
  sent,
  total,
  percentage,
}: {
  sent?: number;
  total?: number;
  percentage?: number;
}) => void;

export type OnErrorFnType = (error: Error) => void;

export type PartType = { signedUrl: string; PartNumber: number };

export type UploadedPartType = { ETag: string; PartNumber: number };

// original source: https://github.com/pilovm/multithreaded-uploader/blob/master/frontend/uploader.js
export class Uploader {
  public timeout: number;
  public chunkSize: number;
  public threadsQuantity: number;
  public file: File;
  public fileName: string;
  public aborted: boolean;
  public uploadedSize: number;
  public progressCache: any;
  public activeConnections: any;
  public parts: PartType[];
  public uploadedParts: UploadedPartType[];
  public fileId: string | null;
  public fileKey: string | null;
  public onProgressFn: OnProgressFnType;
  public onErrorFn: OnErrorFnType;
  public useTransferAcceleration: boolean;

  constructor(options: {
    chunkSize?: number;
    threadsQuantity?: number;
    file: File;
    fileName: string;
    useTransferAcceleration?: boolean;
  }) {
    this.useTransferAcceleration = options.useTransferAcceleration || false;
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    options.chunkSize = options.chunkSize || 0;
    this.chunkSize = Math.max(1024 * 1024 * options.chunkSize, 1024 * 1024 * 5);
    // number of parallel uploads
    options.threadsQuantity = options.threadsQuantity || 0;
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    // adjust the timeout value to activate exponential backoff retry strategy
    this.timeout = 0;
    this.file = options.file;
    this.fileName = options.fileName;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = null;
    this.fileKey = null;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
  }

  start() {
    this.initialize();
  }

  async initialize() {
    try {
      // adding the the file extension (if present) to fileName
      let fileName = this.file.name;

      // initializing the multipart request
      const videoInitializationUploadInput = {
        name: fileName,
      };

      const initializeReponse = await htttp.post<
        { name: string },
        { uploadId: string; key: string }
      >(iNITIALIZE_VIDEO_UPLOAD, videoInitializationUploadInput);

      const AWSFileDataOutput = initializeReponse;

      this.fileId = AWSFileDataOutput.uploadId;
      this.fileKey = AWSFileDataOutput.key;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };

      const urlsResponse = await htttp.post<
        {
          fileId: string;
          fileKey: string;
          parts: number;
        },
        {
          parts: {
            signedUrl: string;
            PartNumber: number;
          }[];
        }
      >(
        this.useTransferAcceleration
          ? GET_PRE_SIGNED_TA_URLS
          : GET_PRE_SIGNED_URLS,
        AWSMultipartFileDataInput
      );

      const newParts = urlsResponse.parts;
      this.parts.push(...newParts);

      this.sendNext();
    } catch (error) {
      await this.complete(error as Error);
    }
  }

  sendNext(retry = 0) {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          if (retry <= 6) {
            retry++;
            const wait = (ms: number) =>
              new Promise((res) => setTimeout(res, ms));
            //exponential backoff retry before giving up
            console.log(
              `Part#${part.PartNumber} failed to upload, backing off ${
                2 ** retry * 100
              } before retrying...`
            );
            wait(2 ** retry * 100).then(() => {
              this.parts.push(part);
              this.sendNext(retry);
            });
          } else {
            console.log(`Part#${part.PartNumber} failed to upload, giving up`);
            this.complete(error);
          }
        });
    }
  }

  async complete(error?: Error) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error as Error);
    }
  }

  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: this.uploadedParts,
      };

      await htttp.post<
        {
          fileId: string;
          fileKey: string;
          parts: {
            PartNumber: number;
            ETag: string;
          }[];
        },
        {}
      >(COMPLETE_VIDEO_UPLOAD, videoFinalizationMultiPartInput);
    }
  }

  sendChunk(chunk: Blob, part: PartType, sendChunkStarted: () => void) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error("Failed chunk upload"));
            return;
          }

          resolve(void 0);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  handleProgress(part: number, event: { type: string; loaded: number }) {
    if (this.file) {
      if (
        event.type === "progress" ||
        event.type === "error" ||
        event.type === "abort"
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === "uploaded") {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent: sent,
        total: total,
        percentage: percentage,
      });
    }
  }

  upload(file: Blob, part: PartType, sendChunkStarted: () => void) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      const throwXHRError = (
        error: ProgressEvent<EventTarget>,
        part: PartType,
        abortFx: () => void
      ) => {
        delete this.activeConnections[part.PartNumber - 1];
        reject(error);
        window.removeEventListener("offline", abortFx);
      };
      if (this.fileId && this.fileKey) {
        if (!window.navigator.onLine) reject(new Error("System is offline"));

        const xhr = (this.activeConnections[part.PartNumber - 1] =
          new XMLHttpRequest());
        xhr.timeout = this.timeout;
        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener("progress", progressListener);

        xhr.addEventListener("error", progressListener);
        xhr.addEventListener("abort", progressListener);
        xhr.addEventListener("loadend", progressListener);

        xhr.open("PUT", part.signedUrl);
        const abortXHR = () => xhr.abort();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader("ETag");

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ""),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
              window.removeEventListener("offline", abortXHR);
            }
          }
        };

        xhr.onerror = (error) => {
          throwXHRError(error, part, abortXHR);
        };
        xhr.ontimeout = (error) => {
          throwXHRError(error, part, abortXHR);
        };
        xhr.onabort = () => {
          throwXHRError(
            new Error(
              "Upload canceled by user or system"
            ) as unknown as ProgressEvent<EventTarget>,
            part,
            abortXHR
          );
        };
        window.addEventListener("offline", abortXHR);
        xhr.send(file);
      }
    });
  }

  onProgress(onProgress: OnProgressFnType) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: OnErrorFnType) {
    this.onErrorFn = onError;
    return this;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}
