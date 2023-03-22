import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable } from "rxjs";
import { ProductItem } from "../product.model";
import { ProductService } from "../product.service";
import { flatten } from "lodash";
import { GridOptions } from "../../../shared/models/advanced-grid.model";
import { ProductStore } from "../product.store";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductItem[]> = this.productStore.filteredProducts$;
  productsGridOptions!: GridOptions;

  constructor(
    private readonly productService: ProductService,
    private readonly productStore: ProductStore
  ) {
  }

  ngOnInit(): void {
    // this.products$.subscribe(console.log)
    this.productsGridOptions = {
      columnDefs: [
        { field: 'name', pinned: 'left' },
        { field: 'category' },
        { field: 'subcategory' },
        { field: 'currentPrice' },
        { field: 'rawPrice' },
        { field: 'currency' },
        { field: 'discount' },
        { field: 'likesCount' },
        { field: 'isNew' },
        { field: 'brand', hidden: true },
        { field: 'brandUrl', hidden: true },
        { field: 'codcountry' },
        { field: 'id' },
        { field: 'model' },
      ]
    }
  }
}
