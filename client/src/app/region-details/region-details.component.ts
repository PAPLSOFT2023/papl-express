import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.scss']
})
export class RegionDetailsComponent implements OnInit {

  region_all_name: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  searchQuery: string = '';  // Holds the search query

  region_name_type = {
    id: '',
    region_name: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: ApicallService
  ) {}

  ngOnInit(): void {
    this.fetchRegionDetailsUsers();
  }

  fetchRegionDetailsUsers(): void {
    this.userService.getRegionDetailsUsers().subscribe((data) => {
      this.region_all_name = data;
    });
  }

  // Getter for filtered region names based on search query
  get filteredRegionNames(): any[] {
    return this.region_all_name.filter(region => 
      region.region_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Toggle the visibility of the form popup
  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
  }

  // Open form for adding a new region
  openAddForm(): void {
    this.resetRegionDetailsForm(); // Reset form fields
    this.isUpdateMode = false; // Set to Add mode
    this.toggleFormPopup(); // Show the form
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateRegionDetailsUser();
    } else {
      this.addRegionDetailsUser();
    }
  }

  addRegionDetailsUser(): void {
    this.userService.addRegionDetailsUsers(this.region_name_type).subscribe((response) => {
      console.log('Region Name added:', response);
      this.fetchRegionDetailsUsers();
      this.resetRegionDetailsForm();
      alert('Region Name added successfully!');
      this.showFormPopup = false;
    });
  }

  updateRegionDetailsUser(): void {
    const userId = this.region_name_type.id;
    this.userService.updateRegionDetailsUsers(userId, this.region_name_type).subscribe(
      (response) => {
        console.log('Region Name updated:', response);
        this.fetchRegionDetailsUsers();
        this.resetRegionDetailsForm();
        alert('Region Name updated successfully!');
        this.showFormPopup = false;
      },
      (error) => {
        console.error('Error updating Region Name:', error);
      }
    );
  }

  deleteRegionDetailsUser(userId: string): void {
    this.userService.deleteRegionDetailsUsers(userId).subscribe(
      (response) => {
        console.log('Region Name deleted:', response);
        this.fetchRegionDetailsUsers();
        alert('Region Name deleted successfully');
      },
      (error) => {
        console.error('Error deleting Region Name:', error);
      }
    );
  }

  editRegionDetailsUser(regionName: any): void {
    this.region_name_type = { ...regionName }; // Populate form fields with the selected user
    console.log('Editing Region Name with ID:', regionName.id);
    this.isUpdateMode = true; // Set to Edit mode
    this.toggleFormPopup(); // Show the form
    this.scrollToForm(); // Scroll to the form
  }

  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  resetRegionDetailsForm(): void {
    this.region_name_type = {
      id: '',
      region_name: '',
    };
    this.isUpdateMode = false; // Reset to Add mode
  }
}
