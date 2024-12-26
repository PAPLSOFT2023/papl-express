

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-accomodation',
  templateUrl: './travel-accomodation.component.html',
  styleUrls: ['./travel-accomodation.component.scss']
})
export class TravelAccomodationComponent implements OnInit {
  travel_all_accomodation: any[] = [];
  isUpdateMode = false; // Track if we're in update mode
  showFormPopup = false;

  travel_accom = {
    id: '',
    type_of: '',
  };

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTravelAccomUsers();
  }

  fetchTravelAccomUsers(): void {
    this.apicallservice.getTravelAccomUsers().subscribe((data) => {
      this.travel_all_accomodation = data;
    });
  }

  // Toggle the visibility of the form popup
  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetTravelAccomForm();
    }
  }

  // Submit the form: Add or Update based on mode
  onSubmit(): void {
    if (this.isUpdateMode) {
      this.updateTravelAccomUser();
    } else {
      this.addTravelAccomUser();
    }
  }

  // Add a new Travel Accommodation
  addTravelAccomUser(): void {
    this.apicallservice.addTravelAccomUsers(this.travel_accom).subscribe((response) => {
      console.log('Travel Accommodation added:', response);
      this.fetchTravelAccomUsers();
      this.resetTravelAccomForm();
      alert('Travel Accommodation added successfully!');
   
      this.toggleFormPopup(); // Close the form popup
      this.showFormPopup=false
    });
  }

  // Update an existing Travel Accommodation
  updateTravelAccomUser(): void {
    const userId = this.travel_accom.id;
    this.apicallservice.updateTravelAccomUsers(userId, this.travel_accom).subscribe(
      (response) => {
        console.log('Travel Accommodation updated:', response);
        this.fetchTravelAccomUsers();
        this.resetTravelAccomForm();
        alert('Travel Accommodation updated successfully!');
        this.toggleFormPopup(); // Close the form popup
        this.showFormPopup=false
      },
      (error) => {
        console.error('Error updating Travel Accommodation:', error);
      }
    );
  }

  // Delete a Travel Accommodation
  deleteTravelAccomUser(userId: string): void {
    this.apicallservice.deleteTravelAccomUsers(userId).subscribe(
      (response) => {
        console.log('Travel Accommodation deleted:', response);
        this.fetchTravelAccomUsers();
        alert('Travel Accommodation deleted successfully');
      },
      (error) => {
        console.error('Error deleting Travel Accommodation:', error);
      }
    );
  }

  // Edit an existing Travel Accommodation
  editTravelAccomUser(travel: any): void {
    this.travel_accom = { ...travel }; // Populate form fields with the selected accommodation
    this.isUpdateMode = true; // Set to update mode

    // Show the form popup
    this.showFormPopup = true;

    // Scroll to the form
    this.scrollToForm();
  }

  // Scroll to the form when editing
  scrollToForm(): void {
    const formElement = document.querySelector('.popup-overlay33');
    formElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // Reset the form for Add mode
  resetTravelAccomForm(): void {
    this.travel_accom = {
      id: '',
      type_of: '',
    };
    this.isUpdateMode = false; // Reset to Add mode
  }
}
