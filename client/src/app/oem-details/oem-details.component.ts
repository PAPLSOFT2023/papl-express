import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-oem-details',
  templateUrl: './oem-details.component.html',
  styleUrls: ['./oem-details.component.scss']
})
export class OemDetailsComponent {
  oem_all_details: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  searchQuery: string = '';  // Holds the search input value

  oem_all_detail = {
    id: '',
    oem_name: '',
    oem_location: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchOemUsers();
  }

  fetchOemUsers(): void {
    this.apicallservice.getOemUsers().subscribe((data) => {
      this.oem_all_details = data;
    });
  }

  // Getter for filtered OEM details based on the search query
  get filteredOemDetails(): any[] {
    return this.oem_all_details.filter(oem => 
      oem.oem_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      oem.oem_location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateOemUser();
    } else {
      this.addOemUser();
    }
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetForm(); // Reset form when popup is closed
    }
  }

  addOemUser(): void {
    this.apicallservice.addOemUsers(this.oem_all_detail).subscribe((response) => {
      console.log('OEM added:', response);
      this.fetchOemUsers();
      this.resetForm();
      alert('OEM added successfully!');
      this.showFormPopup = false;
    });
  }

  updateOemUser(): void {
    const userId = this.oem_all_detail.id;
    this.apicallservice.updateOemUser(userId, this.oem_all_detail).subscribe(
      (response) => {
        console.log('OEM updated:', response);
        this.fetchOemUsers();
        this.resetForm();
        alert('OEM updated successfully!');
        this.showFormPopup = false;
      },
      (error) => {
        console.error('Error updating OEM:', error);
      }
    );
  }

  deleteOemUser(userId: string): void {
    this.apicallservice.deleteOemUser(userId).subscribe(
      (response) => {
        console.log('OEM deleted:', response);
        this.fetchOemUsers();
        alert('OEM deleted successfully');
      },
      (error) => {
        console.error('Error deleting OEM:', error);
      }
    );
  }

  editOemUser(oem: any): void {
    this.oem_all_detail = { ...oem }; // Populate form fields with the selected user
    this.isUpdateMode = true;
    this.toggleFormPopup(); // Open the popup to edit
  }

  resetForm(): void {
    this.oem_all_detail = {
      id: '',
      oem_name: '',
      oem_location: '',
    };
    this.isUpdateMode = false; // Reset to Add mode
  }
}
