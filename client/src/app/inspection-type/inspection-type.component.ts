

//////////////ts/////////////

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inspection-type',
  templateUrl: './inspection-type.component.html',
  styleUrls: ['./inspection-type.component.scss']
})
export class InspectionTypeComponent implements OnInit {
  inspection_all_type: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  inspection_type_shift = {
    id: '',
    inspection_name: '',
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
    this.fetchInspectionTypeUsers();
  }

  fetchInspectionTypeUsers(): void {
    this.userService.getInspectionTypeUsers().subscribe((data) => {
      this.inspection_all_type = data;
    });
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetInspectionTypeForm();
    }
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateInspectionTypeUser();
    } else {
      this.addInspectionTypeUser();
    }
  }

  addInspectionTypeUser(): void {
    this.userService.addInspectionTypeUsers(this.inspection_type_shift).subscribe((response) => {
      console.log('Inspection Type added:', response);
      this.fetchInspectionTypeUsers();
      this.resetInspectionTypeForm();
      alert('Inspection Type added successfully!');
      this.showFormPopup=false
    });
  }

  updateInspectionTypeUser(): void {
    const userId = this.inspection_type_shift.id;
    this.userService.updateInspectionTypeUsers(userId, this.inspection_type_shift).subscribe(
      (response) => {
        console.log('Inspection Type updated:', response);
        this.fetchInspectionTypeUsers();
        this.resetInspectionTypeForm();
        alert('Inspection Type updated successfully!');
        this.showFormPopup=false
      },
      (error) => {
        console.error('Error updating Inspection Type:', error);
      }
    );
  }

  deleteInspectionTypeUser(userId: string): void {
    this.userService.deleteInspectionTypeUsers(userId).subscribe(
      (response) => {
        console.log('Inspection Type deleted:', response);
        this.fetchInspectionTypeUsers();
        alert('Inspection Type deleted successfully');
      },
      (error) => {
        console.error('Error deleting Inspection Type:', error);
      }
    );
  }

  editInspectionTypeUser(inspectionType: any): void {
    this.inspection_type_shift = { ...inspectionType }; // Populate form fields with the selected type
    console.log('Editing Inspection Type with ID:', inspectionType.id);
    this.isUpdateMode = true;
    this.toggleFormPopup();
    this.scrollToForm();
  }

  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  resetInspectionTypeForm(): void {
    this.inspection_type_shift = {
      id: '',
      inspection_name: '',
    };
    this.isUpdateMode = false;
  }
}

