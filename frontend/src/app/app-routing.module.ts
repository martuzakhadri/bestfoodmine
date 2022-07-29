import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm',component:HomeComponent  },
  {path:'tag/:tag', component:HomeComponent},
  {path:'food/:id', component: FoodPageComponent},
  {path:'cart-page', component: CartPageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterComponent},
  {path:'checkout', component:CheckOutComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
