import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent {
  email: string = '';

  constructor(private router: Router,private apicall:ApicallService) {
    // ... constructor code
  }

  onSubmit() {
    if (this.email) {
      this.apicall.checkUserEmailExists(this.email).subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            console.log("User with email exists:", response);
            
            this.apicall.send_reset_link(this.email).subscribe((response: any) => {
              // Handle success
              console.log('Response from server:', response);
          
              if (response.success === 'Reset link sent to your mail. Please check it.') {
                console.log('Email sent successfully:', response.success);
                alert('Email sent successfully');
              } else {
                console.error('Unexpected success response:', response.success);
                alert('An unexpected success response occurred. Please try again.');
              }
            },
            (error: HttpErrorResponse) => {
              // Handle error
              console.error('Error sending reset link:', error);
          
              if (error.status === 500) {
                alert('Internal server error. Please try again later.');
              } else {
                alert('An unexpected error occurred. Please try again.');
              }
            }
          );
          }
           else {
            alert("User with email does not exist");
            console.log("User with email does not exist");
            // Handle the case when the user with the email does not exist
          }
        },
        (error: any) => {
          console.error("API call error:", error);
          // Handle the error, you might want to show an error message to the user
        }
      );
    } else {
      alert("Please Enter Email");
    }
  }
  

   



    BackToLogin() {
      // Navigate back to the login page when the "Back to Login" button is clicked
      this.router.navigate(['/login']);
  }

}