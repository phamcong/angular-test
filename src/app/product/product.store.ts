import { ComponentStore } from "@ngrx/component-store";
import { initProductState, ProductState } from "./product.state";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { ProductService } from "./product.service";
import { flatten, uniq, uniqBy } from "lodash";
import { SelectItem } from "../../shared/models/common.model";

@Injectable()
export class ProductStore extends ComponentStore<ProductState> {
  readonly products$ = this.select(s => s.products);
  readonly productFilter$ = this.select(s => s.productFilter);
  readonly subCategoryOptions$!: Observable<SelectItem[]>;
  readonly countryOptions$!: Observable<SelectItem[]>;

  readonly filteredProducts$ = this.select(
    this.products$,
    this.productFilter$,
    (products, productFilter) => {
      const { categories, subCategories } = productFilter;
      return products.filter(prd => {
        const catOK = !categories?.length || categories.includes(prd.category);
        const subCatOK = !subCategories?.length || subCategories.includes(prd.subcategory);
        return catOK && subCatOK;
      })
    }
  )

  constructor(private  readonly productService: ProductService) {
    super(initProductState);
    this.getProducts();
  }

  readonly getProducts = this.effect(() => {
    return of({}).pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(() => {
        return forkJoin([
          this.productService.getMenProducts(),
          this.productService.getWomenProducts()
        ]).pipe(
          tap(results => {
            this.patchState({
              products: flatten(results)
            })
          })
        )
      })
    );
  });
}
