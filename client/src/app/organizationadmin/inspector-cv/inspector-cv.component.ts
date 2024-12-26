import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PdfCv {
  increment_id: number;
  PSN_NO: string;
  pdf: string;  // Store the increment_id for fetching the PDF
}

@Component({
  selector: 'app-inspector-cv',
  templateUrl: './inspector-cv.component.html',
  styleUrls: ['./inspector-cv.component.scss']
})
export class InspectorCvComponent implements OnInit {

  isUpdateModalOpen: boolean = false;  // Control the update modal visibility
  pdfCvList: PdfCv[] = [];
  apiUrl: string = 'http://localhost:3000/api/pdf-cv';  // Update with your API URL
  isModalOpen: boolean = false;  // Control the modal visibility
  newUser: { PSN_NO: string, cvFile: File | null } = { PSN_NO: '', cvFile: null };  // New user data
  selectedUser: PdfCv | null = null;  // User to be updated
  selectedFile: File | null = null;  // Declare selectedFile for file updates
  searchTerm: string = '';  // Property to bind to the search input field


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPdfCvData();
  }

  // Open the modal
  openAddUserModal(): void {
  this.isModalOpen = true;
}



// Open the modal for updating a user
openUpdateUserModal(user: PdfCv): void {
  this.selectedUser = { ...user };  // Copy the user data to the selectedUser object
  this.isUpdateModalOpen = true;    // Make sure the modal is set to open
}

closeUpdateModal(): void {
  this.isUpdateModalOpen = false;  // Close the update modal
  this.selectedUser = null;  // Optionally reset the selected user after closing the modal
}


  onUpdateFileSelect(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("File selected:", file);
      this.selectedFile = file; // Save the selected file to the component's state
    }
  }

  // Fetch PDF CV data from the API
  getPdfCvData(): void {
    this.http.get<{ data: PdfCv[] }>(this.apiUrl).subscribe(
      (response) => {
        this.pdfCvList = response.data;  // Store the fetched data
        console.log('Fetched data from API:', this.pdfCvList);  // Print the data in the console
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  openPdf(psnNo: string): void {
    console.log(`Fetching PDF for PSN_NO: ${psnNo}`);  // Log the PSN_NO being requested
  
    const pdfUrl = `http://localhost:3000/api/cv_pdf/${psnNo}`;  // URL to fetch the PDF
  
    // Fetch the PDF as a Blob
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe(
      (pdfBlob: Blob) => {
        console.log('Received PDF Blob:', pdfBlob);  // Log the raw PDF Blob received from the backend
  
        if (pdfBlob.type !== 'application/pdf') {
          console.error('Invalid PDF type:', pdfBlob.type);  // Log if the type is not PDF
          return;
        }
  
        // Create a URL for the Blob object
        const blobUrl = URL.createObjectURL(pdfBlob);
        console.log('Generated Blob URL:', blobUrl);  // Log the Blob URL that will be used to open the PDF
  
        // Open the PDF in a new tab
        const newTab = window.open();
        if (newTab) {
          newTab.document.write('<iframe width="100%" height="100%" src="' + blobUrl + '" frameborder="0"></iframe>');
        } else {
          console.error('Failed to open the PDF in a new tab');
        }
      },
      (error) => {
        console.error('Error fetching PDF:', error);  // Log any errors when fetching the PDF
      }
    );
  }
  
  
  


  // Open the modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.newUser.PSN_NO = '';  // Reset the form fields
    this.newUser.cvFile = null;
  }

  // Handle file selection
  onFileSelect(event: any): void {
    this.newUser.cvFile = event.target.files[0];
  }
  addUser(): void {
    console.log("api works");
  
    // Check if PSN_NO and CV file are provided
    if (!this.newUser.PSN_NO || !this.newUser.cvFile) {
      console.error('Please fill in all fields');
      return; // Prevent submission if required fields are missing
    }
  
    const formData = new FormData();
    formData.append('PSN_NO', this.newUser.PSN_NO); // Add PSN_NO to form data
    formData.append('cvFile', this.newUser.cvFile); // Add the CV file to form data
  
    // Send the form data to the API to add the user
    this.http.post(this.apiUrl, formData).subscribe(
      (response) => {
        console.log('User added successfully:', response);
  
        // Show success message using alert
        window.alert('User added successfully!');  // Display success message
  
        // Refresh the list of users after adding
        this.getPdfCvData();  
  
        // Close the modal after successful submission
        this.closeModal();  
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }
  
  

  updateUser(): void {
    if (!this.selectedUser) {
      console.error('No user selected for update');
      return;
    }
  
    if (!this.selectedFile) {
      console.error('No file selected for update');
      return;
    }
  
    const formData = new FormData();
    formData.append('PSN_NO', this.selectedUser.PSN_NO);  // Include PSN_NO in the form data
    formData.append('pdf', this.selectedFile);  // Append the file under the name 'pdf'
  
    this.http.put(`${this.apiUrl}/${this.selectedUser.increment_id}`, formData).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
          // Show success message using alert
          window.alert('Update successfully!');  // Display success message
        this.getPdfCvData();  // Refresh the list after updating
        this.closeUpdateModal();  // Close the modal after successful update
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
  deleteUser(incrementId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.apiUrl}/${incrementId}`).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
  
          // Instantly update the list on the frontend by filtering out the deleted user
          this.pdfCvList = this.pdfCvList.filter(user => user.increment_id !== incrementId);
  
          // Optionally, if a modal is open and the deleted user was selected, close the modal
          if (this.selectedUser && this.selectedUser.increment_id === incrementId) {
            this.closeUpdateModal(); // Close the update modal if the deleted user was selected
          }
  
          // You can also close any other modals here if necessary:
          // this.isModalOpen = false;  // If needed, close the "add user" modal
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  // Filter list based on search input
  onSearchChange(): void {
    if (this.searchTerm) {
      this.pdfCvList = this.pdfCvList.filter((record) => {
        return record.PSN_NO.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
               record.increment_id.toString().includes(this.searchTerm);
      });
    } else {
      // Reload original data if search term is cleared
      this.getPdfCvData();
    }
  }
  
  
  
  
}

  
  
  


