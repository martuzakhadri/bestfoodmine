import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOGIN_URL, REGISTER_URL } from '../shared/constants/url';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/user';

import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserregister';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get User(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);
          this.toastrService.success(
            `Welcome to the foodmine ${user.name}`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  register(UserRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(REGISTER_URL, UserRegister).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);
          this.toastrService.success(
            `Welcome to the foodmine ${user.name}`,
            'register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }



  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson)
      return JSON.parse(userJson) as User;
      return new User();

  }
}

