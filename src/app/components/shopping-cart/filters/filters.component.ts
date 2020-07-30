import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  productList: Product[] = [];
  orignalProductList: Product[] = [];
  private rangeForm:any;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productList = this.productService.getProducts();
    this.orignalProductList = JSON.parse(JSON.stringify(this.productList));
    this.rangeForm = this.formBuilder.group({
      startRange: ['', Validators.required],
      endRange: ['', Validators.required]
     })
  }

  filterByPrice() {
    if (this.rangeForm.dirty && this.rangeForm.valid) {
      this.productList = JSON.parse(JSON.stringify(this.orignalProductList)).filter((prod) => prod.price >= this.rangeForm.value.startRange && prod.price <= this.rangeForm.value.endRange);
      this.productService.setProducts(this.productList);
    }
  }

}