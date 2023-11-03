import axios from "axios";
import {
  ABORT_VIDEO_UPLOAD,
  COMPLETE_VIDEO_UPLOAD,
  GET_PRE_SIGNED_TA_URLS,
  GET_PRE_SIGNED_URLS,
  iNITIALIZE_VIDEO_UPLOAD,
} from "../constants/endpoints";
import htttp from "../htttp";
import { OnErrorFnType, OnProgressFnType, UploadCompleteResponseData, onComplete } from "@/types";

export type PartType = { signedUrl: string; PartNumber: number };
export type UploadedPartType = { ETag: string; PartNumber: number };
export type GetPresignedUrlParams = {
  fileId: string;
  fileKey: string;
  parts: number;
};
export type GetPresignedUrlResponse = {
  parts: PartType[];
};
export type SendCompleteRequestParams = {
  fileId: string;
  fileKey: string;
  parts: {
    PartNumber: number;
    ETag: string;
  }[];
};

export type AbortVideoUploadParams = {
  fileKey: string;
  fileId: string;
};

export class MultiPartUploader {
  public timeout: number;
  public chunkSize: number;
  public threadsQuantity: number;
  public file: File;
  public fileName: string;
  public aborted: boolean;
  public uploadedSize: number;
  public progressCache: any;
  public activeConnections: Record<string, AbortController>;
  public parts: PartType[];
  public uploadedParts: UploadedPartType[];
  public fileId: string | null;
  public fileKey: string | null;
  public onProgressFn: OnProgressFnType;
  public onErrorFn: OnErrorFnType;
  public onCompleteFn: onComplete;
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
    this.onCompleteFn = () => {};
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
      this.fileId = initializeReponse.uploadId;
      this.fileKey = initializeReponse.key;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);
      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };
      const urlsResponse = await htttp.post<
        GetPresignedUrlParams,
        GetPresignedUrlResponse
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
        console.log("completed");
        this.complete();
      }
      console.log("no parts");
      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      this.sendChunk(chunk, part)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          this.parts.push(part);
          this.complete(error);
        });

      this.sendNext();
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

      const response = await htttp.post<
        SendCompleteRequestParams,
        UploadCompleteResponseData
      >(COMPLETE_VIDEO_UPLOAD, videoFinalizationMultiPartInput);
      this.onCompleteFn(response);
    }
  }

  sendChunk(chunk: Blob, part: PartType) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part)
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

  handleProgress(part: number, uploaded: number, totalSize: number) {
    if (this.file) {
      this.progressCache[part] = uploaded;

      if (uploaded === totalSize) {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache).reduce(
        (memo, id) => (memo += this.progressCache[id]),
        0
      );

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

  upload(file: Blob, part: PartType) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      this.activeConnections[part.PartNumber - 1] = controller;
      const formData = new FormData();
      formData.append("file", file);
      axios
        .put(part.signedUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          signal: controller.signal,
          onUploadProgress: (progressEvent) => {
            this.handleProgress(
              part.PartNumber - 1,
              progressEvent.loaded,
              progressEvent.total!
            );
          },
        })
        .then((res) => {
          const ETag = res.headers["Etag"] || res.headers["etag"];
          console.log(res.headers);
          if (ETag) {
            const uploadedPart = {
              PartNumber: part.PartNumber,
              ETag: ETag.replaceAll('"', ""),
            };

            this.uploadedParts.push(uploadedPart);

            resolve(res.status);
            delete this.activeConnections[part.PartNumber - 1];
            // window.removeEventListener("offline");
          }
        })
        .catch((err) => reject(err));
    });
  }

  onComplete(onComplete: onComplete) {
    this.onCompleteFn = onComplete;
    return this;
  }

  onProgress(onProgress: OnProgressFnType) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: OnErrorFnType) {
    this.onErrorFn = onError;
    return this;
  }

  async abort() {
    Object.keys(this.activeConnections).forEach((id) => {
      this.activeConnections[id].abort();
    });
    await this.sendAbortRequest();
    this.aborted = true;
  }

  async sendAbortRequest() {
    htttp.post<AbortVideoUploadParams>(ABORT_VIDEO_UPLOAD, {
      fileKey: this.fileKey,
      fileId: this.fileId,
    });
  }
}
