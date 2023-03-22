import { ProductFilter, ProductItem } from "./product.model";

export interface ProductState {
  productFilter: ProductFilter,
  products: ProductItem[]
}

export const initProductState = {
  productFilter: {},
  products: []
}
