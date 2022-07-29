import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { cartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
cart! :Cart;
  constructor(private cartService:CartService) {
    this.cartService.getcartObservable().subscribe(cart=>{
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromcart(cartItem:cartItem){
    this.cartService.removecart(cartItem.food.id);

  }
  changequantity(cartItem:cartItem,quantityintostring:string){
let quantity = parseInt(quantityintostring);
this.cartService.changequantity(cartItem.food.id,quantity);

}
}
