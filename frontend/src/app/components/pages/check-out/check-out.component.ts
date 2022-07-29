import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  order:Order = new Order()
checkOutForm!:FormGroup;
  constructor( cartservice:CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private orderService:OrderService,
    private toastService:ToastrService) {
      const cart  = cartservice.getCart();
      this.order.items = cart.items;
      this.order.price=cart.totalPrice;
    }

  ngOnInit(): void {
    let {name,address} = this.userService.User;
    this.checkOutForm = this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required],
    })

  }
  get fc(){
    return this.checkOutForm.controls;
  }

  createOrder(){
    if(this.checkOutForm.invalid){
     this.toastService.warning("Please fill all the fields");
      return;
    }
    if(!this.order.addressLng){
      this.toastService.warning("Please select the address");
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;


    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse)=>{
        this.toastService.error(errorResponse.error,'Cart');

      }
    })
  }

}
