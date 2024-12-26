import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  vendor_masters: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  searchQuery: string = ''; // Holds the search query

  vendor_master = {
    id: '',
    vendor_name: '',
    alias: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(private apicallservice: ApicallService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVendors();
  }

  fetchVendors(): void {
    this.apicallservice.getUsers().subscribe((data) => {
      this.vendor_masters = data;
    });
  }

  // Getter for filtered vendor masters based on search query
  get filteredVendors(): any[] {
    return this.vendor_masters.filter(vendor => 
      vendor.vendor_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vendor.alias.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Toggle the visibility of the form popup
  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
  }

  // Open the form in Add mode
  openAddForm(): void {
    this.isUpdateMode = false;
    this.resetForm();
    this.toggleFormPopup();
  }

  // Open the form in Edit mode
  editUser(vendor: any): void {
    this.vendor_master = { ...vendor }; // Pre-fill the form with vendor data
    this.isUpdateMode = true;
    this.toggleFormPopup();
    this.scrollToForm();
  }

  // Submit the form based on Add or Update mode
  onSubmit(): void {
    if (this.isUpdateMode) {
      this.updateVendor();
    } else {
      this.addVendor();
    }
  }

  // Add a new vendor
  addVendor(): void {
    this.apicallservice.addUsers(this.vendor_master).subscribe((response) => {
      console.log('Vendor added:', response);
      this.fetchVendors();
      this.resetForm();
      alert('Vendor added successfully!');
      this.showFormPopup = false;
    });
  }

  // Update an existing vendor
  updateVendor(): void {
    const vendorId = this.vendor_master.id;
    this.apicallservice.updateUser(vendorId, this.vendor_master).subscribe(
      (response) => {
        console.log('Vendor updated:', response);
        this.fetchVendors();
        this.resetForm();
        alert('Vendor updated successfully!');
        this.showFormPopup = false;
      },
      (error) => {
        console.error('Error updating vendor:', error);
      }
    );
  }

  // Delete a vendor
  deleteUser(vendorId: string): void {
    this.apicallservice.deleteUser(vendorId).subscribe(
      (response) => {
        console.log('Vendor deleted:', response);
        this.fetchVendors();
        alert('Vendor deleted successfully');
      },
      (error) => {
        console.error('Error deleting vendor:', error);
      }
    );
  }

  // Scroll to the form when editing
  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // Reset the form to initial state
  resetForm(): void {
    this.vendor_master = {
      id: '',
      vendor_name: '',
      alias: '',
    };
    this.isUpdateMode = false;
  }
}
