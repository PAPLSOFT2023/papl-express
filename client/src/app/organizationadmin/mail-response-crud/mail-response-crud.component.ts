import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mail-response-crud',
  templateUrl: './mail-response-crud.component.html',
  styleUrls: ['./mail-response-crud.component.scss'],
  providers: [DatePipe] // Add DatePipe here
})
export class MailResponseCrudComponent implements OnInit {

  client_status_all: any[] = []; // Array to store all client data
  filteredClients: any[] = []; // Array to store filtered client data
  isUpdateMode = false; // To track whether we're editing or adding
  showFormPopup = false; // Popup visibility toggle
  searchText: string = ''; // Text entered in the search bar

  client_details = {
    id: '', // ID of the selected client
    client_approval_status: 0 // Default approval status
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe // Inject DatePipe here
  ) {}

  ngOnInit(): void {
    this.fetchMailResponseUsers(); // Fetch initial data
  }

  /**
   * Fetch the list of clients and their details
   */
  fetchMailResponseUsers(): void {
    this.apicallservice.getMailResponseUsers().subscribe(
      (data) => {
        console.log('Fetched users:', data); // Debugging fetched data
        this.client_status_all = data;
        this.filteredClients = data; // Initialize filtered data
      },
      (error) => {
        console.error('Error fetching client data:', error);
      }
    );
  }

  filterClients(): void {
    const searchLower = this.searchText.toLowerCase(); // Convert search text to lowercase
    this.filteredClients = this.client_status_all.filter((client) =>
      Object.values(client).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.isUpdateMode) {
      this.updateMailResponseUser();
    } else {
      alert('Add functionality is not implemented yet.');
    }
  }

  /**
   * Update client approval status
   */
  updateMailResponseUser(): void {
    const userId = this.client_details.id; // ID of the user to update
    const status = this.client_details.client_approval_status; // New status

    if (!userId) {
      console.error('Error: User ID is not defined.');
      return; // Exit if no ID is provided
    }

    // Call API to update client status
    this.apicallservice.updateClientApprovalStatus(userId, status).subscribe(
      (response) => {
        console.log('Client approval status updated:', response);
        this.fetchMailResponseUsers(); // Refresh the data
        this.resetMailResponseForm(); // Reset the form
        alert('Client approval status updated successfully!');
      },
      (error) => {
        console.error('Error updating client approval status:', error);
      }
    );
  }

  /**
   * Edit button handler: Open popup with client details
   * @param user Selected user data
   */
  editMailResponseUser(user: any): void {
    console.log('Editing user:', user); // Debugging user data

    if (!user.id) {
      console.error('Error: User ID is missing or undefined.');
      return;
    }

    this.client_details = { ...user }; // Copy user data into the form
    this.isUpdateMode = true; // Enable update mode
    this.showFormPopup = true; // Open the popup
  }

  /**
   * Close the popup and reset the form
   */
  resetMailResponseForm(): void {
    this.client_details = {
      id: '', // Reset ID
      client_approval_status: 0 // Reset approval status
    };
    this.isUpdateMode = false; // Switch back to add mode
    this.showFormPopup = false; // Close the popup
  }

  /**
   * Transform date using DatePipe
   * @param date The date to transform
   * @returns Formatted date string
   */
  transformDate(date: string): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
