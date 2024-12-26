import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {
  signature_master: any[] = [];
  filteredSignatures: any[] = [];  // Store filtered signatures
  searchTerm: string = '';  // Search input field
  showFormPopup = false; // Controls the visibility of the form popup
  isUpdateMode = false; // Tracks whether the form is for adding or updating
  modalImage: string | null = null;
  signature_type = {
    id: '',
    inspector_name: '',
    signature: null as File | string | null,
  };
  previewImage: string | null = null; // To hold the preview image URL

  @ViewChild('formContainer') formContainer!: ElementRef;
  @ViewChild('signatureInput') signatureInput!: ElementRef;

  constructor(private http: HttpClient, private apicallservice: ApicallService) {}

  ngOnInit(): void {
    this.fetchSignatureUsers();
  }

 // Fetch signature data
 fetchSignatureUsers(): void {
  this.apicallservice.getSignatureUsers().subscribe((data) => {
    this.signature_master = data.map((signature: any) => {
      if (signature.signature && !signature.signature.startsWith('data:image/png;base64,')) {
        signature.signature = 'data:image/png;base64,' + signature.signature; // Add base64 prefix if not already present
      }
      return signature;
    });
    this.filteredSignatures = [...this.signature_master];  // Initialize filtered signatures with all signatures
  });
}


 // Method to filter signatures based on the search term
 filterSignatures(): void {
  this.filteredSignatures = this.signature_master.filter(signature =>
    signature.inspector_name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

  // Handle form submission (Add or Update)
  onSubmit() {
    if (this.isUpdateMode) {
      this.updateSignatureUser();
    } else {
      this.addSignatureUser();
    }
  }

  // Add new signature user
  addSignatureUser(): void {
    const formData = new FormData();
    formData.append('inspector_name', this.signature_type.inspector_name);
    formData.append('signature', this.signature_type.signature as Blob);

    this.apicallservice.addSignatureUsers(formData).subscribe(
      (response) => {
        this.fetchSignatureUsers(); // Update signature list after adding
        this.resetSignatureForm();  // Reset the form after adding
        this.toggleFormPopup();     // Close the popup
        alert('Signature added successfully!');
      },
      (error) => {
        console.error('Error adding Signature:', error);
      }
    );
  }

  // Update existing signature user
  updateSignatureUser(): void {
    const formData = new FormData();
    formData.append('inspector_name', this.signature_type.inspector_name);
    if (this.signature_type.signature instanceof File) {
      formData.append('signature', this.signature_type.signature);
    }
    formData.append('id', this.signature_type.id);

    this.apicallservice.updateSignatureUsers(this.signature_type.id, formData).subscribe(
      (response) => {
        this.fetchSignatureUsers(); // Update signature list after updating
        this.resetSignatureForm();  // Reset the form after updating
        this.toggleFormPopup();     // Close the popup
        alert('Signature updated successfully!');
      },
      (error) => {
        console.error('Error updating Signature:', error);
      }
    );
  }

  // Delete a signature user
  deleteSignatureUser(userId: string): void {
    this.apicallservice.deleteSignatureUsers(userId).subscribe(
      (response) => {
        this.fetchSignatureUsers();
        alert('Signature deleted successfully');
      },
      (error) => {
        console.error('Error deleting Signature:', error);
      }
    );
  }

  // Edit existing signature user
  editSignatureUser(signature_type: any): void {
    this.signature_type = { ...signature_type };
    this.isUpdateMode = true;
    this.previewImage = signature_type.signature;
    this.toggleFormPopup(); // Open the form popup in edit mode
  }

  // Toggle the form popup
  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetSignatureForm(); // Reset form when popup is closed
    }
  }

  // Reset the signature form
  resetSignatureForm(): void {
    this.signature_type = {
      id: '',
      inspector_name: '',
      signature: null,
    };
    this.previewImage = null;
    if (this.signatureInput) {
      this.signatureInput.nativeElement.value = ''; // Reset the file input
    }
    this.isUpdateMode = false; // Reset to add mode
  }

  // Handle file input change (preview signature image)
  onSignatureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.signature_type.signature = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Open the modal with the clicked image
  openImageModal(image: string): void {
    this.modalImage = image;
  }

  // Close the image modal
  closeImageModal(): void {
    this.modalImage = null;
  }
}
