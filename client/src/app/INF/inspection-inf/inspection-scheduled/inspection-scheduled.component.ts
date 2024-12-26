import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection-scheduled',
  templateUrl: './inspection-scheduled.component.html',
  styleUrls: ['./inspection-scheduled.component.scss']
})
export class InspectionScheduledComponent {

  handclick:string='assets/Hand Click1.png'

  status1Records: any[] = [];
  filteredStatus0Records: any[] = [];
  isLoading = true;
  errorMessage: string = '';




  constructor(private http:HttpClient,private router:Router){

  }
  ngOnInit(): void {
    this.fetchStatus0Records();
  }

  fetchStatus0Records(): void {
    const apiUrl = `${environment.serverUrl}api/inf-status-0`;  // Use serverUrl from environment
    this.http.get<any[]>(apiUrl)
      .subscribe({
        next: (data) => {
          console.log('Status 0 Records:', data);
          this.status1Records = data;
          this.filteredStatus0Records = data; // Initialize filteredStatus1Records
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching status 0 records:', error);
          this.errorMessage = 'Failed to load status 0 records';
          this.isLoading = false;
        }
      });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStatus0Records = this.status1Records.filter(record =>
      record.contract_number.toLowerCase().includes(searchTerm) ||
      record.project_name.toLowerCase().includes(searchTerm) ||
      record.building_name.toLowerCase().includes(searchTerm) ||
      record.location.toLowerCase().includes(searchTerm)
    );
  }

  handleClick(contract_no:string) {
    this.router.navigate(['afterlogin','inspection_inf',contract_no]);
  }

}