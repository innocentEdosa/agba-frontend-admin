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

//  "id": "888ed277-fd9d-4882-8bea-a7807d033759",
//                 "title": "jg",
//                 "parent_id": null,
//                 "slug": "jg",
//                 "created_at": "2023-10-20T18:46:06.207Z",
//                 "updated_at": "2023-10-20T18:46:06.208Z",
//                 "main_category": null,
//                 "main_id": null
