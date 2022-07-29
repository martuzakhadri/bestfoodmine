import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { cartItem } from '../shared/models/cartItem';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getcartFromlocalStorage();
  private cartsubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.cart
  );

  constructor() {}

  addTocart(food: Food): void {
    let cartitem = this.cart.items.find(
      (item: any) => item.food.id === food.id
    );
    if (cartitem) return;
    this.cart.items.push(new cartItem(food));
    this.setCartTolocalStorage();
  }

  removecart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartTolocalStorage();
  }
  changequantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;

    quantity = cartItem.quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.setCartTolocalStorage();
  }

  clearcart() {
    this.cart = new Cart();
    this.setCartTolocalStorage();
  }

  getcartObservable(): Observable<Cart> {
    return this.cartsubject.asObservable();
  }

  public getCart(): Cart {
    return this.cartsubject.value;

  }

  private setCartTolocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentSum) => prevSum + currentSum.price,
      0
    );

    this.cart.totalcount = this.cart.items.reduce(
      (prevSum, currentSum) => prevSum + currentSum.quantity,
      0
    );

    const cartjson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartjson);
    this.cartsubject.next(this.cart);
  }

  private getcartFromlocalStorage(): Cart {
    const cartjson = localStorage.getItem('cart');
    return cartjson ? JSON.parse(cartjson) : new Cart();
  }
}
