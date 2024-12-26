import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-of-building',
  templateUrl: './type-of-building.component.html',
  styleUrls: ['./type-of-building.component.scss']
})
export class TypeOfBuildingComponent implements OnInit {

  building_all_name: any[] = [];
  isUpdateMode = false;
  showFormPopup = false;

  searchQuery: string = '';  // Holds the search query

  building_name_type = {
    id: '',
    building_name: ''
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
    this.fetchTypeOfBuildingUsers();
  }

  fetchTypeOfBuildingUsers(): void {
    this.userService.getTypeOfBuildingUsers().subscribe((data) => {
      this.building_all_name = data;
    });
  }

  // Getter for filtered building names based on search query
  get filteredBuildingNames(): any[] {
    return this.building_all_name.filter(building => 
      building.building_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleFormPopup(): void {
    this.showFormPopup = !this.showFormPopup;
    if (!this.showFormPopup) {
      this.resetTypeOfBuildingForm();
    }
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateTypeOfBuildingUser();
    } else {
      this.addTypeOfBuildingUser();
    }
  }

  addTypeOfBuildingUser(): void {
    this.userService.addTypeOfBuildingUsers(this.building_name_type).subscribe((response) => {
      console.log('Building Name added:', response);
      this.fetchTypeOfBuildingUsers();
      this.resetTypeOfBuildingForm();
      alert('Building Name added successfully!');
      this.showFormPopup = false;
    });
  }

  updateTypeOfBuildingUser(): void {
    const userId = this.building_name_type.id;
    this.userService.updateTypeOfBuildingUsers(userId, this.building_name_type).subscribe(
      (response) => {
        console.log('Building Name updated:', response);
        this.fetchTypeOfBuildingUsers();
        this.resetTypeOfBuildingForm();
        alert('Building Name updated successfully!');
        this.showFormPopup = false;
      },
      (error) => {
        console.error('Error updating Building Name:', error);
      }
    );
  }

  deleteTypeOfBuildingUser(userId: string): void {
    this.userService.deleteTypeOfBuildingUsers(userId).subscribe(
      (response) => {
        console.log('Building Name deleted:', response);
        this.fetchTypeOfBuildingUsers();
        alert('Building Name deleted successfully');
      },
      (error) => {
        console.error('Error deleting Building Name:', error);
      }
    );
  }

  editTypeOfBuildingUser(buildingName: any): void {
    this.building_name_type = { ...buildingName }; // Populate form fields with the selected user
    console.log('Editing Building Name with ID:', buildingName.id);
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

  resetTypeOfBuildingForm(): void {
    this.building_name_type = {
      id: '',
      building_name: ''
    };
    this.isUpdateMode = false; // Reset to Add mode
  }
}
