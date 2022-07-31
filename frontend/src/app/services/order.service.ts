import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL,  ORDER_NEW_ORDER_CURRENT_USER_URL, ORDER_PAY_URL } from '../shared/constants/url';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
order!:Order
  constructor( private http:HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL,order)
  }
GetNewOrderForCurrentUser():Observable<Order>{
  return this.http.get<Order>(ORDER_NEW_ORDER_CURRENT_USER_URL)
}

pay(order:Order):Observable<string>{
  return this.http.post<string>(ORDER_PAY_URL,order)
}
}
