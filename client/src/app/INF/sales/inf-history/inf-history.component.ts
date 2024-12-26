import { Component,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-inf-history',
  templateUrl: './inf-history.component.html',
  styleUrls: ['./inf-history.component.scss']
})
export class InfHistoryComponent {

  selectedFilter: string = '';     // Selected filter for month range
  
  status1Records: any[] = [];
  filteredStatus0Records: any[] = [];
  isLoading = true;
  errorMessage: string = '';
  fromDate: string = ''; // Bind fromDate to the input
  toDate: string = '';   // Bind toDate to the input

  isPopupVisible: boolean = false;
  isDateRangeFieldsVisible: boolean = false;
  isApplyTextVisible: boolean = false;
  loading: boolean = false;
  done: boolean = false;

  constructor(private http: HttpClient,private router:Router,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchStatus0Records();
  }
  handleClick(c_no: string) {
    // Handle the click event here
    const encodedValue = encodeURIComponent(c_no);
    this.router.navigate(['afterlogin/status_one', encodedValue]);
  }

  filterByDateRange(): any[] {
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    return this.status1Records.filter(record => {
      const generatedDate = new Date(record.generated_date);
      return generatedDate >= from && generatedDate <= to;
    });
  }

  filterRecords(): void {
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    // Filter the records based on the date range
    this.filteredStatus0Records = this.status1Records.filter(record => {
      const generatedDate = new Date(record.generated_date);
      return generatedDate >= from && generatedDate <= to;
    });

    console.log('Filtered Records:', this.filteredStatus0Records);
  }

  applyDateRangeFilter(): void {
    const currentDate = new Date();
    let fromDate = new Date();
    let toDate = currentDate;  // Set 'toDate' as current date for all cases

    if (this.selectedFilter === 'thisMonth') {
      // Set fromDate to the start of this month
      fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    } else if (this.selectedFilter === 'lastTwoMonths') {
      // Set fromDate to the start of two months ago
      fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
    } else if (this.selectedFilter === 'lastThreeMonths') {
      // Set fromDate to the start of three months ago
      fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
    }
    else if (this.selectedFilter === 'lastSixMonths') {
      // Set fromDate to the start of six months ago
      fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
    } else if (this.selectedFilter === 'oneYear') {
      // Set fromDate to the start of one year ago
      fromDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
    }

    else if (this.selectedFilter === 'date-range') {
      // Do not filter by date, display all records
      this.filteredStatus0Records = this.status1Records;
      console.log('Displaying all records without date filtering:', this.filteredStatus0Records);
      return;  // Skip the filtering logic below
    }

    // Filter the records based on the selected date range
    this.filteredStatus0Records = this.status1Records.filter(record => {
      const generatedDate = new Date(record.generated_date);
      return generatedDate >= fromDate && generatedDate <= toDate;
    });

    console.log('Filtered Records for selected month range:', this.filteredStatus0Records);
  }



  // Method to download the filtered data as Excel
  // downloadFilteredExcel(): void {
  //   const filteredData = this.filterByDateRange();

  //   const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Records');

  //   XLSX.writeFile(workbook, 'filtered-records.xlsx');
  // }
  downloadFilteredExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredStatus0Records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Records');

    XLSX.writeFile(workbook, 'filtered-records.xlsx');
  }

  fetchStatus0Records(): void {
    const apiUrl = `${environment.serverUrl}api/inf-status-1`;  
    this.http.get<any[]>(apiUrl)
      .subscribe({
        next: (data) => {
          console.log('Status 0 Records:', data);
          this.status1Records = data;
          this.filteredStatus0Records = data; // Initialize filteredStatus1Records
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if needed
          }, 1000);
        },
        error: (error) => {
          console.error('Error fetching status 0 records:', error);
          this.errorMessage = 'Failed to load status 0 records';
          
        }
      });
  }
  downloadExcel(record: any): void {
    // Create a worksheet from the record data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([record]);
  
    // Create a new workbook and append the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
  
    // Convert the workbook to binary format
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a Blob from the buffer
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    // Create a link element and set it up for download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${record.contract_number}.xlsx`;
    link.click();
  
    // Clean up by revoking the Object URL
    URL.revokeObjectURL(url);
  }

  downloadAllAsExcel(): void {
    // Create a worksheet from the entire list of records
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredStatus0Records);
  
    // Create a new workbook and append the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
  
    // Convert the workbook to binary format
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a Blob from the buffer
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    // Create a link element and set it up for download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'All_Records.xlsx';  // Set the desired filename for the Excel file
    link.click();
  
    // Clean up by revoking the Object URL
    URL.revokeObjectURL(url);
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  // Toggle date range visibility based on the selected option
  toggleDateRange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === 'date-range') {
      this.isDateRangeFieldsVisible = true;
      this.isApplyTextVisible = true;
    } else {
      this.isDateRangeFieldsVisible = false;
      this.isApplyTextVisible = false;
    }
  }

  // Apply filter logic
  applyFilter(): void {
    alert('Filter applied!');
  }

  // Download button functionality
  downloadData(): void {
    alert('Download initiated!');
  }

  // Handle clicks outside of the popup to close it
  onWindowClick(event: Event): void {
    const target = event.target as HTMLElement;
    const popup = document.getElementById('filterPopup');
    const filterButton = document.querySelector('.filter-icon-btn');

    if (popup && filterButton && target !== popup && !popup.contains(target) && target !== filterButton) {
      this.isPopupVisible = false;
    }
  }


  onClick(): void {
    if (!this.loading && !this.done) {
      this.loading = true;

      // Simulate the loading process
      setTimeout(() => {
        this.done = true; // Show the checkmark
        this.loading = false; // Stop the loading animation
      }, 1000); // Delay of 1 second before showing the checkmark

      // No reset anymore, the tick stays visible
    }
  }
  
  

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStatus0Records = this.status1Records.filter(record =>
      record.contract_number.toLowerCase().includes(searchTerm) ||
      record.project_name.toLowerCase().includes(searchTerm) ||
      record.location.toLowerCase().includes(searchTerm)
    );
  }
}