import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  status1Records: any[] = [];
  filteredStatus1Records: any[] = [];
  isLoading = true;
  errorMessage: string = '';

  constructor(private http: HttpClient,private router:Router,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchStatus1Records();
  }
  handleClick(c_no: string) {
    // Handle the click event here
    const encodedValue = encodeURIComponent(c_no);
    this.router.navigate(['afterlogin/status_one', encodedValue]);
  }

  fetchStatus1Records(): void {
    const apiUrl = `${environment.serverUrl}api/inf-status-0`;  
    this.http.get<any[]>(apiUrl)
      .subscribe({
        next: (data) => {
          console.log('Status 1 Records:', data);
          this.status1Records = data;
          this.filteredStatus1Records = data; // Initialize filteredStatus1Records
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if needed
          }, 1000);

        },
        error: (error) => {
          console.error('Error fetching status 1 records:', error);
          this.errorMessage = 'Failed to load status 1 records';
         
        }
      });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStatus1Records = this.status1Records.filter(record =>
      record.contract_number.toLowerCase().includes(searchTerm) ||
      record.project_name.toLowerCase().includes(searchTerm) ||
      record.location.toLowerCase().includes(searchTerm)
    );
  }
}