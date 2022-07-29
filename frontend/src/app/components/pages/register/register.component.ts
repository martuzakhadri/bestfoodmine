import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserregister';
import { passwordMatchValidator } from 'src/app/shared/validators/password_match_validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registereForm! :FormGroup;
  isSubmitted=false;
  returnUrl = '';

  constructor( private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
      private userService: UserService,
     private router: Router) { }

  ngOnInit(): void {
    this.registereForm = this.FormBuilder.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required,Validators.minLength(3)]],
      address:['',[Validators.required,Validators.minLength(3)]],
    },{
      validator: passwordMatchValidator('password','confirmPassword')
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

  }
  get fc(){
    return this.registereForm.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.registereForm.invalid) return;

    const fv = this.registereForm.value;
    const user : IUserRegister = {
      name: fv.name,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmPassword, //this is the same as password
      address:fv.address

    };
    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
