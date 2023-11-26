import {
  OnErrorFnType,
  OnProgressFnType,
  UploadCompleteResponseData,
  onComplete,
} from "@/types";
import http from "../htttp";
import { GET_PRESIGNED_URL_FOR_SMALL_SIZE_VIDEOS } from "../constants/endpoints";
import axios from "axios";

export class Uploader {
  public file: File;
  public controller?: AbortController;
  public onProgressFn: OnProgressFnType;
  public onErrorFn: OnErrorFnType;
  public onCompleteFn: onComplete;

  constructor(file: File) {
    this.file = file;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.onCompleteFn = () => {};
  }

  async start() {
    try {
      const presignUrlResponse = await http.post<
        { name: string },
        { url: string; s3Path: string }
      >(GET_PRESIGNED_URL_FOR_SMALL_SIZE_VIDEOS, { name: this.file.name });

      await this.upload(presignUrlResponse.url);

      const aws_url = presignUrlResponse.url.split("?")[0];
      this.onCompleteFn({ s3Path: presignUrlResponse.s3Path, aws_url });
    } catch (err) {
      this.onErrorFn(err as Error);
    }
  }

  upload(url: string) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      this.controller = controller;
      const formData = new FormData();
      formData.append("file", this.file);
      axios
        .put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          signal: controller.signal,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.progress) {
              this.handleProgress(progressEvent.loaded, progressEvent.total!);
            }
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  handleProgress(sent: number, total: number) {
    const percentage = Math.round((sent / total) * 100);

    this.onProgressFn({
      sent: sent,
      total: total,
      percentage: percentage,
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
    this.controller?.abort();
  }
}
