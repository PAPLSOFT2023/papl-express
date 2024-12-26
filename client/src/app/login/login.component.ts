
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  mail_not_verified = false;


  userData = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    terms: false,
    organization_display_name:'',
    organization:''
  };

  constructor(
    private authService: ApicallService,
    private router: Router,
    private cookieService: CookieService
  ) {}


  Submit_status:any;
  Passwords_status:any; 
  formSubmitted = false;
  passwordMismatch = false;
  passwordVisible1 = false;
  passwordVisible2 = false;

  ngOnInit() {
    // Check if cookies are set, and if yes, populate the username and password fields
    const rememberedUsername = this.cookieService.get('rememberedUsername');
    const rememberedPassword = this.cookieService.get('rememberedPassword');

    if (rememberedUsername && rememberedPassword) {
      this.username = rememberedUsername;
      this.password = rememberedPassword;
      this.rememberMe = true; // Optionally, you can set the checkbox to checked
    }

    // Dynamically load and initialize reCAPTCHA
    this.loadRecaptcha();
  }

  loadRecaptcha() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Render reCAPTCHA widget after script is loaded
      grecaptcha.ready(() => {
        // Replace 'sitekey' with your environment's site key
        grecaptcha.render('captchaElem', { 'sitekey': environment.siteKey });
      });
    };
  }

  onSubmit() {
    if (this.username !== '' && this.password !== '') {
      // Call your login service with username and password
      this.authService.login(this.username, this.password).subscribe(
        (response: any) => {
          if (response) {
            const token = response.token;
            const status = response.status;
            const role1 = response.role.replace('\r', '').replace('\n', '');
            const organization = response.organization;
            const userName = response.user_name;
            const mail_status = response.mail_status;
            
            // Store the token and user information in session storage
            sessionStorage.setItem('Role', role1);
            sessionStorage.setItem('Organization', organization);
            sessionStorage.setItem('UserName', userName);
  
            // Redirect to another page or perform desired actions
            if (status === 1) {
              if (mail_status == 1) {
                sessionStorage.setItem('Email', this.username);
                this.router.navigate(['/afterlogin', { role: role1 }]);
              } else {
                this.mail_not_verified = true;
                alert('Mail Not Verified.');
              }
            } else {
              alert('You will need Administrater Rights to login');
            }
          }
        },
        (error: any) => {
          console.error(error);
          if (error.status === 401) {
            // Unauthorized: Invalid username or password
            // Display an error message to the user
            alert('Unauthorized user');
          } else {
            // Handle other types of errors (e.g., server errors)
            alert('An server error occurred');
          }
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  Resend_Mail_verificarion() {
    if (this.username != '') {
      this.authService.Resend_mail_verification(this.username).subscribe((response: any) => {
        if (response.success) {
          // Show success alert
          alert('Verification link sent successfully');
          this.mail_not_verified = false;
        } else {
          // Show error alert
          alert('Failed to send verification link');
        }
      });
    }
  }







  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
    const signInButton = document.getElementById('signIn') as HTMLButtonElement;
    const container = document.getElementById('container') as HTMLElement;

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }







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
      this.authService.adminregister(this.userData.email,this.userData.password,this.userData.organization_display_name,"Organization Admin",0,"Softwareadmin",this.userData.name,0,"Administrative").subscribe(
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

