import { PriceType } from "@/constants/course";
import { Avatar } from "./shared";
import { Author } from "./author";
import { CategoryType } from "./category";

export type Course = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  category_id: string;
  sub_category_id: string;
  authors: Author[];
  category?: CategoryType;
  sub_category?: CategoryType;
  avatar?: Avatar;
  slug: string;
  rating: number;
  status?: string;
  price_value?: number | null;
  price_type?: PriceType | null;
  is_featured: boolean;
  is_coming: boolean;
  created_at: string;
  updated_at: string;
  thumbnails: string[];
};

export type CreateCourseType = {
  title: string;
  description: string;
  short_description: string;
  rating?: number;
  author_id: string;
  category_id: string;
  sub_category_id?: string;
  is_featured?: boolean;
  is_coming?: boolean;
  price_value?: number | null;
  price_type?: PriceType | null;
  avatar?: any;
};

export type UpdateCourseType = Partial<CreateCourseType>;

export type UpdateCourseParamsType = {
  id: string;
} & UpdateCourseType;
