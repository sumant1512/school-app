export interface CategoryListType {
  categoryList: CategoryType[];
}

export interface CategoryType {
  category_id: number;
  category_name: string;
  created_on: string;
  last_updated_on: string;
}
