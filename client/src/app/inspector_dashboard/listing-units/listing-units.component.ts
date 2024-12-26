import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listing-units',
  templateUrl: './listing-units.component.html',
  styleUrls: ['./listing-units.component.scss'],
})
export class ListingUnitsComponent {
  val: string | null = '';
  units: string[] = []; // List of units
  editingIndex: number | null = null; // Index of the unit being edited
  editedValue: string = ''; // Temporary storage for the edited value


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.val = params.get('c_no');
      console.log(this.val);
    });
  }

  ngOnInit() {
    const value = this.val;
    const inspector = `${environment.serverUrl}api/fetch_units?encodedValue=${value}`;
    this.http.get<string[]>(inspector).subscribe(
      (data: string[]) => {
        this.units = JSON.parse(data[0]); // Parse data into units
        console.log(this.units);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  proceed(unit: string) {
    console.log('Clicked on unit:', unit);

    if (unit) {
      this.router.navigate(['afterlogin', 'section', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

  // Open the modal pop-up for editing
  editUnit(index: number) {
    this.editingIndex = index; // Set the index being edited
    this.editedValue = this.units[index]; // Set the current unit value in the temp storage
    alert('Unit number can only be changed before the inspection is carried out. Once the inspection starts, changes will not be allowed.');
  }

  
  saveUnit() { 
    if (this.editingIndex !== null && this.val && this.editedValue) {
      const payload = {
        
        document_id: this.val, // Document ID
        new_unit_no: this.editedValue, // New unit_no to update
      };
  
      this.http.put(`${environment.serverUrl}api/update-unit-details`, payload).subscribe(
        (response: any) => {
          console.log('Unit updated successfully:', response);
          this.units[this.editingIndex!] = this.editedValue; // Update local list with new value
          this.editingIndex = null; // Reset the editing index
        },
        (error) => {
          // Display alert if the update fails due to the inspection already being carried out
          if (error.status === 403) {
            alert('Unit number can only be changed before the inspection is carried out. Once the inspection starts, changes will not be allowed.');
          } else {
            console.error('Update failed:', error);
          }
        }
      );
    }
  }
  
  

  // Close the modal without saving
  cancelEdit() {
    this.editingIndex = null; // Close the editing modal
  }
}

