import { Component } from '@angular/core';
import { ProductService } from "./product.service";
import { forkJoin, map, Observable } from "rxjs";
import { flatten } from "lodash";
import { ProductItem } from "./product.model";
import { ProductStore } from "./product.store";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductStore],
})
export class ProductComponent {
}
