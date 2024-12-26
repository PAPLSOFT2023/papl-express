import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApicallService } from 'src/app/apicall.service';


@Component({
  selector: 'app-client-default-cc',
  templateUrl: './client-default-cc.component.html',
  styleUrls: ['./client-default-cc.component.scss']
})
export class ClientDefaultCcComponent {
   // Array to hold all mail IDs
   default_all_details: any[] = [];

   // Flag to toggle between Add and Update modes
   isUpdateMode = false;
 
   // Object to hold the current mail ID and other details
   default_all = {
     s_no: '',
     mailid: '',
   };
 
   // ViewChild to scroll to the form when editing
   @ViewChild('formContainer') formContainer!: ElementRef;
 
   // Flag to control the popup visibility
   showFormPopup: boolean = false;
 
   constructor(
     private http: HttpClient,
     private apicallservice: ApicallService,
     private router: Router,
     private formBuilder: FormBuilder,
     private userService: ApicallService
   ) {}
 
   ngOnInit(): void {
     // Fetch existing mail IDs from the server when component loads
     this.fetchDefaultUsers();
   }
 
   // Fetch the list of mail IDs
   fetchDefaultUsers(): void {
     this.userService.getDefaultUsers().subscribe((data) => {
       this.default_all_details = data;
     });
   }
 
   // Function to handle form submission (Add or Update)
   onSubmit(): void {
     if (this.isUpdateMode) {
       this.updateDefaultUser();
     } else {
       this.addDefaultUser();
     }
   }
 
   // Function to add a new Mail ID
   addDefaultUser(): void {
     this.userService.addDefaultUsers(this.default_all).subscribe((response) => {
       console.log('Mail Id added:', response);
       this.fetchDefaultUsers();
       this.resetDefaultForm();
       this.toggleFormPopup(); // Close the popup after submission
       alert('Mail Id added successfully!');
     });
   }
 
   // Function to update an existing Mail ID
   updateDefaultUser(): void {
     const userId = this.default_all.s_no; // Use 's_no' as the identifier
     this.userService.updateDefaultUsers(userId, this.default_all).subscribe(
       (response) => {
         console.log('Mail Id updated:', response);
         this.fetchDefaultUsers();
         this.resetDefaultForm();
         this.toggleFormPopup(); // Close the popup after submission
         alert('Mail Id updated successfully!');
       },
       (error) => {
         console.error('Error updating Mail Id:', error);
       }
     );
   }
 
   // Function to delete a Mail ID
   deleteDefaultUser(userId: string): void {
     this.userService.deleteDefaultUsers(userId).subscribe(
       (response) => {
         console.log('Mail Id deleted:', response);
         this.fetchDefaultUsers();
         alert('Mail Id deleted successfully');
       },
       (error) => {
         console.error('Error deleting Mail Id:', error);
       }
     );
   }
 
   // Function to set the form into Update mode and populate it
   editDefaultUser(mail_id: any): void {
     this.default_all = { ...mail_id }; // Copy values of the selected Mail ID into the form
     this.isUpdateMode = true;  // Set the form to Update mode
     this.toggleFormPopup(); // Open the popup
   }
 
   // Toggle the visibility of the form popup
   toggleFormPopup(): void {
     this.showFormPopup = !this.showFormPopup;
 
     // When closing the popup, reset the form
     if (!this.showFormPopup) {
       this.resetDefaultForm();
     }
   }
 
   // Function to reset the form to its default state
   resetDefaultForm(): void {
     this.default_all = {
       s_no: '',
       mailid: '',
     };
     this.isUpdateMode = false; // Reset to Add mode
   }
 
   // Scroll to the form when editing a Mail ID
   scrollToForm(): void {
     this.formContainer?.nativeElement.scrollIntoView({
       behavior: 'smooth',
       block: 'start',
     });
   }
 }
 


