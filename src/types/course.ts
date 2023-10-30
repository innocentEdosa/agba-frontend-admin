import { Avatar } from "./shared";

export type Course = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  author: string;
  category: string;
  subCategory: string;
  avatar?: Avatar;
  slug: string;
  rating: number;
  status?: string;
  price: string;
  is_featured: boolean;
  is_coming: boolean;
  createdAt: string;
  updatedAt: string;
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
  price?: string;
  avatar?: File;
};
