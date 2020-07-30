import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs'
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;
  @Output() removeproductItem: Product

  constructor(private msg: MessengerService, private prd: ProductService) { 
    
  }

  ngOnInit() {
  }

  itemAddToCart() {
    this.msg.sendMsg(this.productItem)
  }

  itemRemoveFromCart() {
    this.msg.sendMsg({ ...this.productItem, remove: true })
  }

}
