export interface ProductItem {
  category: string;
  subcategory: string;
  name: string;
  currentPrice: number;
  rawPrice: number;
  currency: string;
  discount: number;
  likesCount: number;
  isNew: boolean;
  brand: string;
  brandUrl: string;
  codcountry: string;
  id: number;
  model: string;
}

export interface ProductFilter {
  categories?: string[];
  subCategories?: string[];
  countries?: string[];
  searchText?: string;
}
