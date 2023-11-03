export interface CategoryType {
  id: string;
  title: string;
  parent_id?: string;
  main_category?: string;
  main_id?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export type CreateCategoryParam = {
  title: string;
  parent_id?: string;
};

export type GetCategoriesResponseType = {
  top_category?: CategoryType[];
} & Record<string, CategoryType[]>;

export type CategoriesType = Record<string, CategoryType[]>;

export type UpdateCategoryType = Partial<CreateCategoryParam>;

export type UpdateCategoryParam = {
  id: string;
} & UpdateCategoryType;
