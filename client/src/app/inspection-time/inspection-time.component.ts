
import { NgFor, CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inspection-time',
  templateUrl: './inspection-time.component.html',
  styleUrls: ['./inspection-time.component.scss']
})
export class InspectionTimeComponent {


  constructor(private http: HttpClient, private apicallservice: ApicallService, private router: Router,private formBuilder: FormBuilder,private userService:ApicallService) {}

  inspection_all_time: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  inspection_time = {
    id: '',
    time_shift: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;



  ngOnInit(): void {
    this.fetchInspectionUsers();
  }

  fetchInspectionUsers(): void {
    this.userService.getInspectionUsers().subscribe((data) => {
      this.inspection_all_time = data;
    });
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateInspectionUser();
    } else {
      this.addInspectionUser();
    }
  }

  addInspectionUser(): void {
    this.userService
      .addInspectionUsers(this.inspection_time)
      .subscribe((response) => {
        console.log('Time Shift added:', response);
        this.fetchInspectionUsers();
        this.resetInspectionForm();
        alert('Time Shift added successfully!');
        this.showFormPopup=false
      });
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetInspectionForm();
    }
  }

  updateInspectionUser(): void {
    const userId = this.inspection_time.id;
    this.userService
      .updateInspectionUser(userId, this.inspection_time)
      .subscribe(
        (response) => {
          console.log('OEM updated:', response);
          this.fetchInspectionUsers();
          this.resetInspectionForm();
       
          alert('Time Shift updated successfully!');
          this.showFormPopup=false
        },
        (error) => {
          console.error('Error updating Time Shift:', error);
        }
      );
      
  }

  deleteInspectionUser(userId: string): void {
    this.userService.deleteInspectionUser(userId).subscribe(
      (response) => {
        console.log('Time Shift deleted:', response);
        this.fetchInspectionUsers();
        alert('Time Shift deleted successfully');
      },
      (error) => {
        console.error('Error deleting Time Shift:', error);
      }
    );
  }

  editInspectionUser(inspection: any): void {
    this.inspection_time = { ...inspection }; // Populate form fields with the selected user
    console.log('Editing Time Shift with ID:', inspection.id);
    this.isUpdateMode = true;
    this.toggleFormPopup();
    // Scroll to the form
    this.scrollToForm();
  }

  scrollToForm(): void {
    this.formContainer?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  resetInspectionForm(): void {
    this.inspection_time = {
      id: '',
      time_shift: '',
    };
    this.isUpdateMode = false; // Reset to Add mode
  }

}

