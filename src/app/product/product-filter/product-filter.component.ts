import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SelectItem } from "../../../shared/models/common.model";
import { Observable } from "rxjs";
import { ProductStore } from "../product.store";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  filterForm: FormGroup;
  categoryOptions = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
  ];

  subCategoryOptions$: Observable<SelectItem[]> = this.productStore.subCategoryOptions$;
  countryOptions$: Observable<SelectItem[]> = this.productStore.countryOptions$;

  constructor(private readonly fb: FormBuilder, private  readonly productStore: ProductStore) {
    this.filterForm = this.fb.group({
      searchText: new FormControl(''),
      categories: new FormControl(),
      subCategories: new FormControl(),
      countries: new FormControl()
    })
  }

  onSubmitFilter() {
    this.productStore.patchState({
      productFilter: this.filterForm.value
    })
  }
}
