import { AbstractControl } from "@angular/forms";

export const passwordMatchValidator =
(passwordControllname:string, confirmPasswordName:string) =>{
  const validator = (form:AbstractControl)=>{
    const passwordControll = form.get(passwordControllname);
    const confirmpasswordControll = form.get(confirmPasswordName);

    if(!passwordControll || !confirmpasswordControll) return ;

      if(passwordControll.value !== confirmpasswordControll.value){
        confirmpasswordControll.setErrors({notMatch:true});
      }
      else{
       const errors = confirmpasswordControll.errors;
       if(!errors) return;
        delete errors.notMatch;
        confirmpasswordControll.setErrors(errors);
      }

  }
  return validator;
}
