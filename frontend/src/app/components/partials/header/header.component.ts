import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: User;
cartquantity = 0;
  constructor( private cartservice: CartService , private userService: UserService) {
    this.cartservice.getcartObservable().subscribe(cart=>{
      this.cartquantity = cart.totalcount;
    })
    userService.userObservable.subscribe((user)=>{
      this.user = user;
    })

  }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout();
  }
isAuth(){
  return this.user.token;
}
}
