export interface CategoryType {
  id: string;
  title: string;
  parent_id?: string;
  main_category?: string;
  main_id?: string;
  slug: string;
}

export type CategoriesType = Record<string, CategoryType[]>;
