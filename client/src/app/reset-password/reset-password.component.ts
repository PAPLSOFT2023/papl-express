import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApicallService } from '../apicall.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  
  email: string = '';
  password1: string = '';
  password2: string = '';
  resetForm: FormGroup;
   token:string="";
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private apicall:ApicallService) {

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.token = params['token'];
      if (this.token) {
        // Do something with the token, such as sending it to your reset password service
        console.log('Reset token:', this.token);
      }
    });  
    
  }
  submitForm() {
    if (this.resetForm.valid) {
      // Your form submission logic here
     if(this.password1 == this.password2)
     {
      if(this.email!==null){
        console.log("Entered items",this.password1,this.email,this.token)
              this.apicall.reset_Password(this.token, this.email, this.password1).subscribe(
        (result: any) => {
          if(result.success === "Password updated successfully"){
          // Handle success
          console.log('Password updated successfully:', result);
          alert('Password updated successfully');
          this.password1=""
          this.password2=""
          this.email=""
          }
          else{
            alert(result.error)
          }
        },
        (error: HttpErrorResponse) => {
          // Handle error
          console.error('Error updating password:', error);
  
          if (error.status === 404) {
            alert('Email not found or token is invalid');
          } else if (error.status === 500) {
            alert('Internal server error. Please try again later.');
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        }
      );
      }
      else{
        alert("Email Not Valid")
      }


     }
    } else {
      // Handle the case when the form is not valid
      alert('Form is invalid');
    }
  }
}

// Custom validator for password matching
const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');

  return password1 && password2 && password1.value !== password2.value ? { 'passwordMismatch': true } : null;
};
