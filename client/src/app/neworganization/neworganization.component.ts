import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-neworganization',
  templateUrl: './neworganization.component.html',
  styleUrls: ['./neworganization.component.scss']
})
export class NeworganizationComponent{
  userData = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    terms: false,
    organization_display_name:'',
    organization:''
  };

  constructor(private authservice:ApicallService,private router:Router){}
  Submit_status:any;
  Passwords_status:any; 
  formSubmitted = false;
  passwordMismatch = false;
  passwordVisible1 = false;
  passwordVisible2 = false;

  submitForm() {
    this.Submit_status="";
    this.Passwords_status="";

    if(this.userData.name && this.userData.email && this.userData.password && this.userData.confirm_password && this.userData.organization_display_name && this.userData.organization){
    this.formSubmitted = true;

    if (this.userData.password !== this.userData.confirm_password) {
      this.Passwords_status="Password and Confirm Password do not match."; 
      this.passwordMismatch = true;
      return;
    }
    else{
      this.authservice.adminregister(this.userData.email,this.userData.password,this.userData.organization_display_name,"Organization Admin",0,"Softwareadmin",this.userData.name,0,"Administrative").subscribe(
        (response: any) => {
          if(response)
          {
            this.passwordMismatch = false;
            this.Submit_status="Register successful";
            alert("Register successful"); 
            this.router.navigate([""]);
        
          }
        },
        (error: any) => {
          this.passwordMismatch = false;
          if (error.error && error.error.message) {
            this.Submit_status = error.error.message;
          }
           else {
            // If the error response doesn't have the expected structure, handle it accordingly
            this.Submit_status = 'An error occurred.';
          }
        }
      );
    }
  }
  else{
    alert("Please Enter All Fields");
  }
  }

  togglePasswordVisibility1() {
 
    this.passwordVisible1 = !this.passwordVisible1;
  }
  togglePasswordVisibility2() {
    
    this.passwordVisible2 = !this.passwordVisible2;
  }
}
