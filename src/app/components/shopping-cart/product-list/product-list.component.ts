import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = []

  constructor(private productService: ProductService) {
    this.productService.productListChange.subscribe(value => {
      this.productList = this.productService.getProducts();
    });
  }

  ngOnInit() {
    this.productList = this.productService.getProducts();
  }

  sortingProductList(value: string){
    switch(value) {
      case "sortByNameAsc":
         this.productList.sort((a, b) => (a.name > b.name) ? 1 : -1);
         break;
      case "sortByNameDesc":
         this.productList.sort((a, b) => (a.name < b.name) ? 1 : -1);
         break;
      case "sortByPriceHTL":
        this.productList.sort((a, b) => (a.price < b.price) ? 1 : -1);
         break;
      case "sortByPriceLTH":
        this.productList.sort((a, b) => (a.price > b.price) ? 1 : -1);
        break;
    }
  }

}
