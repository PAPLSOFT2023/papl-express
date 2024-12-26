

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inspection-time-shift',
  templateUrl: './inspection-time-shift.component.html',
  styleUrls: ['./inspection-time-shift.component.scss'],
})
export class InspectionTimeShiftComponent implements OnInit {
  inspection_all_time_shift: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  inspection_time_shift = {
    id: '',
    inspection_time: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchInspectionTimeShiftUsers();
  }

  fetchInspectionTimeShiftUsers(): void {
    this.apicallservice.getInspectionTimeShiftUsers().subscribe((data) => {
      this.inspection_all_time_shift = data;
    });
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetInspectionTimeShiftForm();
    }
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateInspectionTimeShiftUser();
    } else {
      this.addInspectionTimeShiftUser();
    }
  }

  addInspectionTimeShiftUser(): void {
    this.apicallservice
      .addInspectionTimeShiftUsers(this.inspection_time_shift)
      .subscribe((response) => {
        console.log('Inspection Time Shift added:', response);
        this.fetchInspectionTimeShiftUsers();
        this.resetInspectionTimeShiftForm();
        this.showFormPopup=false
        alert('Inspection Time Shift added successfully!');
      });
  }

  updateInspectionTimeShiftUser(): void {
    const userId = this.inspection_time_shift.id;
    this.apicallservice
      .updateInspectionTimeShiftUsers(userId, this.inspection_time_shift)
      .subscribe(
        (response) => {
          console.log('Inspection Time Shift updated:', response);
          this.fetchInspectionTimeShiftUsers();
          this.resetInspectionTimeShiftForm();
          alert('Inspection Time Shift updated successfully!');
          this.showFormPopup=false
        },
        (error) => {
          console.error('Error updating Inspection Time Shift:', error);
        }
      );
  }

  deleteInspectionTimeShiftUser(userId: string): void {
    this.apicallservice.deleteInspectionTimeShiftUsers(userId).subscribe(
      (response) => {
        console.log('Inspection Time Shift deleted:', response);
        this.fetchInspectionTimeShiftUsers();
        alert('Inspection Time Shift deleted successfully');
      },
      (error) => {
        console.error('Error deleting Inspection Time Shift:', error);
      }
    );
  }

  editInspectionTimeShiftUser(inspectionTimeShift: any): void {
    this.inspection_time_shift = { ...inspectionTimeShift };
    this.isUpdateMode = true;
    this.showFormPopup = true;
    this.scrollToForm();
  }

  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  resetInspectionTimeShiftForm(): void {
    this.inspection_time_shift = {
      id: '',
      inspection_time: '',
    };
    this.isUpdateMode = false;
  }
}

