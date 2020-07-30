import { Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, mergeMap, map, } from 'rxjs/operators';

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  // @Input() productList;
  // @Output() searchModelChange: EventEmitter<any> = new EventEmitter();

  productList: Product[] = [];
  orignalProductList: Product[] = [];

  public updateSearchModel = new Subject<KeyboardEvent>();

  private subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.productList = this.productService.getProducts();
    this.orignalProductList = JSON.parse(JSON.stringify(this.productList));
    this.subscription = this.updateSearchModel.pipe(
      map(event => {
         return  event.target['value']
        }),
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(250),
      )),
    ).subscribe(
      (data) => {
      this.productList = JSON.parse(JSON.stringify(this.orignalProductList)).filter(
        (prod) => prod.name.toLowerCase().indexOf(data.toLowerCase()) !== -1
        );
      this.productService.setProducts(this.productList);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
