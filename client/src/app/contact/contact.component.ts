import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  errorMessage: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.pattern('[0-9]*')],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this.http.post(environment.serverUrl + '/submit', formData, { observe: 'response' })
              .subscribe(
          (response: HttpResponse<any>) => {
            console.log('Response from server:', response);
            if (response.status === 200) {
              this.errorMessage = '';
              this.contactForm.reset();
              alert('Your message has been successfully sent.');
            } else {
              this.errorMessage = 'An error occurred while sending your message. Please try again later.';
            }
          },
          error => {
            console.error('Error submitting form:', error);
            this.errorMessage = 'An error occurred while sending your message. Please try again later.';
          }
        );
    } else {
      // Mark all form fields as touched to display validation messages
      this.markFormGroupTouched(this.contactForm);
    }
  }

  // Helper function to mark all form fields as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}