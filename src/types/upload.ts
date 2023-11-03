export type OnProgressFnType = ({
  sent,
  total,
  percentage,
}: {
  sent?: number;
  total?: number;
  percentage?: number;
}) => void;
export type onComplete = (params: UploadCompleteResponseData) => void;
export type OnErrorFnType = (error: Error) => void;
export type UploadCompleteResponseData = {
  s3Path: string;
  aws_url: string;
  name?: string;
  size?: number;
};
