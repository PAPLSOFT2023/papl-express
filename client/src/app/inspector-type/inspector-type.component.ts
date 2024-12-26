

////////////////ts//////////////

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-inspector-type',
  templateUrl: './inspector-type.component.html',
  styleUrls: ['./inspector-type.component.scss']
})
export class InspectorTypeComponent implements OnInit {
  
  inspector_all_type: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;
  
  inspector_type = {
    id: '',
    inspector_type: '',
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
    this.fetchInspectorUsers();
  }

  fetchInspectorUsers(): void {
    this.userService.getInspectorUsers().subscribe((data) => {
      this.inspector_all_type = data;
    });
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      // Reset the form when closing the popup
      this.resetInspectorForm();
    }
  }

  onSubmit(): void {
    if (this.isUpdateMode) {
      this.updateInspectorUser();
    } else {
      this.addInspectorUser();
    }
  }

  addInspectorUser(): void {
    this.userService.addInspectorUsers(this.inspector_type).subscribe((response) => {
      console.log('Inspector Type added:', response);
      this.fetchInspectorUsers();
      this.resetInspectorForm();
      this.showFormPopup=false
      alert('Inspector Type added successfully!');
    });
  }

  updateInspectorUser(): void {
    const userId = this.inspector_type.id;
    this.userService.updateInspectorUser(userId, this.inspector_type).subscribe(
      (response) => {
        console.log('Inspector Type updated:', response);
        this.fetchInspectorUsers();
        this.resetInspectorForm();
        alert('Inspector Type updated successfully!');
        this.showFormPopup=false
      },
      (error) => {
        console.error('Error updating Inspector Type:', error);
      }
    );
  }

  deleteInspectorUser(userId: string): void {
    this.userService.deleteInspectorUser(userId).subscribe(
      (response) => {
        console.log('Inspector Type deleted:', response);
        this.fetchInspectorUsers();
        alert('Inspector Type deleted successfully');
      },
      (error) => {
        console.error('Error deleting Inspector Type:', error);
      }
    );
  }

  editInspectorUser(inspector: any): void {
    this.inspector_type = { ...inspector }; // Populate form fields with the selected user
    console.log('Editing Inspector Type with ID:', inspector.id);
    this.isUpdateMode = true;
    this.toggleFormPopup(); // Open the popup to edit
    
    // Scroll to the form
    this.scrollToForm();
  }

  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  resetInspectorForm(): void {
    this.inspector_type = {
      id: '',
      inspector_type: '',
    };
    this.isUpdateMode = false; // Reset to Add mode
  }
}
