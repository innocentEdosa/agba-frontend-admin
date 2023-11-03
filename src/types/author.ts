import { Avatar } from "./shared";

export type Author = {
  id: string;
  last_name: string;
  first_name: string;
  avatar: Avatar;
  email?: string;
  work_history?: string;
  details: string;
  website?: string;
  linkedIn?: string;
  is_featured?: boolean;
  rating?: number;
  slug: string;
  thumbnails?: string[];
  created_at: string;
  updated_at: string;
};

export type CreateAuthor = {
  first_name: string;
  last_name: string;
  details?: string | null;
  work_history: string;
  rating?: number;
  avater?: any;
  email: string;
  phone_number?: string;
  is_featured?: boolean;
  website?: string,
  linkedIn?: string
};

export type UpdateAuthorType = Partial<CreateAuthor>;

export type UpdateAuthorParams = {
  id: string;
} & UpdateAuthorType;
