export type Avatar = {
  id: string;
  name: string;
  cloudinary_url: string;
  s3_path: string;
  aws_url: string;
  user_id: string | null;
  author_id: string | null;
  courses_id: string | null;
  created_at: string;
  updated_at: string;
};
