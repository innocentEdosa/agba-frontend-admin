import { Course } from "./course";

export type GetRequestParamsType = {
  limit?: number;
  page?: number;
  sort?: string;
  filter?: string;
  options?: string;
};

export type MetaType = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: null;
  previous_page_url: null;
};

export type ResponseType<T = Record<string, any>> = {
  data: T;
  meta: MetaType;
};

export type CourseResponseType = ResponseType<Course[]> & {
  extraMap: {
    featured_position: number;
    total_enrollements: number;
    total_length: number;
  };
};
