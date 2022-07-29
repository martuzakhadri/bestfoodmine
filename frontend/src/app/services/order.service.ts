import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDER_CREATE_URL } from '../shared/constants/url';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
order!:Order
  constructor( private http:HttpClient) { }

  create(order:Order){
    return this.http.post(ORDER_CREATE_URL,order)
  }
}
