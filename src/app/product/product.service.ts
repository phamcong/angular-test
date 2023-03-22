import { Injectable } from "@angular/core";
import { menProducts } from "./data/men-products";
import { delay, Observable, of } from "rxjs";
import { ProductItem } from "./product.model";
import { womenProducts } from "./data/women-products";

@Injectable({ providedIn: 'root' })
export class ProductService {
  getMenProducts(): Observable<ProductItem[]> {
    return of(menProducts).pipe(delay(1000));
  }

  getWomenProducts(): Observable<ProductItem[]> {
    return of(womenProducts).pipe(delay(2000));
  }

}
