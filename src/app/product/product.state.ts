import { ProductFilter, ProductItem } from './product.model';

export interface ProductState {
  productFilter: ProductFilter;
  products: ProductItem[];
  isChangeSubCategory: number;
  isChangeCountry: number;

}

export const initProductState = {
  productFilter: {},
  products: [],
  isChangeSubCategory: 0,
  isChangeCountry: 0,
};
