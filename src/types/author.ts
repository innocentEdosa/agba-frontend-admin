import { Avatar } from "./shared";

export type Author = {
  id: string;
  last_name: string;
  first_name: string;
  avatar?: Avatar;
  email?: string;
  work_history?: string;
  details: string;
  website?: string;
  linkedIn?: string;
  is_featured?: boolean;
  rating?: number;
  bio: string;
  slug: string;
  thumbnails?: string[];
  created_at: string;
  updated_at: string;
};

export type CreateAuthor = {
  first_name: string;
  last_name: string;
  details?: string;
  work_history: string;
  rating?: number;
  avater?: File;
  email: string;
  phone_number: string;
  is_featured?: boolean;
};
