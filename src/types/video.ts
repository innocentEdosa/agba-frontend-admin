import { GetRequestParamsType } from "./api";

export type Video = {
  id: string;
  title: string;
  course_id: string;
  description?: string;
  position?: number;
  is_preview?: boolean;
  size?: number;
  duration?: number;
  ext?: string;
  url?: string;
  s3Path?: string;
  public_id?: string;
  asset_id?: string;
  created_at: string;
  updated_at: string;
};

export type CreateVideoDetails = {
  title: string;
  description: string;
  position: number;
  is_preview: boolean;
  size?: number;
  duration?: number;
  ext?: string;
  url?: string;
  s3_path?: string;
  public_id?: string;
  asset_id?: string;
};

export type CreateVideoDetailsParams = {
  course_id: string;
} & CreateVideoDetails;

export type UpdateVideo = {
  title?: string;
  description?: string;
  position?: number;
  is_preview?: boolean;
  size?: number;
  duration?: number;
  ext?: string;
  url?: string;
  public_id?: string;
  asset_id?: string;
  s3_path?: string;
};

export type UpdateVideoParams = {
  id: string;
} & UpdateVideo;

export type GetCourseVideosParams = {
  id: string;
} & GetRequestParamsType;
