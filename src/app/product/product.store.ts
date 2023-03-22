import { ComponentStore } from '@ngrx/component-store';
import { initProductState, ProductState } from './product.state';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductService } from './product.service';
import { flatten, uniq, uniqBy } from 'lodash';
import { SelectItem } from '../../shared/models/common.model';
import { countries } from './data/countrie';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductStore extends ComponentStore<ProductState> {
  readonly products$ = this.select((s) => s.products);
  readonly productFilter$ = this.select((s) => s.productFilter);
  readonly isChangeCountry$ = this.select((s) => s.isChangeCountry);
  readonly isChangeSubCategory$ = this.select((s) => s.isChangeSubCategory);

  readonly subCategoryOptions$: Observable<SelectItem[]> = this.select(
    this.products$,
    this.productFilter$,
    this.isChangeSubCategory$,
    (products, productFilter, isChangeFilter) => {
      let { countries }: any = productFilter;
      const newProducts = countries?.length
        ? products.filter(
            (x) =>
              countries.findIndex((y: string) => x.codcountry.includes(y)) >= 0
          )
        : products;
      const subCategoryOptions = [
        ...new Set(newProducts.map((x) => x.subcategory)),
      ]
        .map((x) => ({ label: x, value: x }))
        .sort((x, y) => x.label.localeCompare(y.label));
      return subCategoryOptions;
    }
  );

  readonly countryOptions$: Observable<SelectItem[]> = this.select(
    this.products$,
    this.productFilter$,
    this.isChangeCountry$,
    (products, productFilter, isChangeFilter) => {
      const countriesMap: any = {};
      countries.forEach((x: any) => {
        countriesMap[x.code] = x.name;
      });

      let { subCategories }: any = productFilter;
      const newProducts = subCategories?.length
        ? products.filter((x) => subCategories.includes(x.subcategory))
        : products;

      const listOfCountriesInProducts = [
        ...new Set(
          flatten(
            newProducts
              .filter((x) => x.codcountry)
              .map((x) => x.codcountry.split(','))
          )
        ),
      ]
        .map((code) => ({ label: countriesMap[code], value: code }))
        .sort((x, y) => x.label.localeCompare(y.label));

      return listOfCountriesInProducts;
    }
  );

  readonly filteredProducts$ = this.select(
    this.products$,
    this.productFilter$,
    (products, productFilter) => {
      const { categories, subCategories, countries } = productFilter;
      return products.filter((prd) => {
        const catOK = !categories?.length || categories.includes(prd.category);
        const subCatOK =
          !subCategories?.length || subCategories.includes(prd.subcategory);
        const countriesOK =
          !countries?.length ||
          countries.findIndex((x) => prd.codcountry.includes(x)) >= 0;
        return catOK && subCatOK && countriesOK;
      });
    }
  );

  constructor(private readonly productService: ProductService) {
    super(initProductState);
    this.getProducts();
  }

  readonly getProducts = this.effect(() => {
    return of({}).pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(() => {
        return forkJoin([
          this.productService.getMenProducts(),
          this.productService.getWomenProducts(),
        ]).pipe(
          tap((results) => {
            this.patchState({
              products: flatten(results),
            });
          })
        );
      })
    );
  });
}
