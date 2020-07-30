import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListChange = new Subject();

  products: Product[] = [
    new Product(1, 'Apple', 100),
    new Product(2, 'Orange', 150),
    new Product(3, 'Mango', 50),
    new Product(4, 'Pineapple', 200),
    new Product(5, 'Banana', 250),
    new Product(6, 'Plum', 300),
  ]

  constructor(private http: HttpClient) {
    this.productListChange.subscribe((value: Product[]) => {
      this.products = value
    });
   }

  getProducts() {
    return this.products;
  }
  setProducts(productList) {
    this.productListChange.next(productList);
  }
}
