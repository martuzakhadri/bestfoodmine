import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

//window.paypal
declare var paypal: any;
@Component({
  selector: 'paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  @Input() order!: Order;
  @ViewChild('paypal', { static: true }) paypalElement: any;
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    const self = this;
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.price,
              },
            },
          ],
        });
      },
      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe({
          next: (OrderId) => {
            this.cartService.clearcart();
            this.router.navigateByUrl('/track' + OrderId);
            this.toaster.success('Order Placed Successfully');
          },
          error: () => {
            this.toaster.error('payment save failed');
          },
        });
      },
      onError: (err: any) => {
        this.toaster.error('paymant failed');
        console.log(err);
      },
    }).render(this.paypalElement.nativeElement);
  }
}
