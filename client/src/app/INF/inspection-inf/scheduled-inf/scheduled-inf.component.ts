import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-scheduled-inf',
  templateUrl: './scheduled-inf.component.html',
  styleUrls: ['./scheduled-inf.component.scss']
})

export class ScheduledInfComponent implements OnInit {
  photo: string = 'assets/Hand Click1.png';
  status1Records: any[] = [];
  filteredStatus1Records: any[] = [];
  isLoading = true;
  errorMessage: string = '';
  selectedFilter: string = ''; 
  location: string = '';
  isPopupVisible: boolean = false;
  isDateRangeFieldsVisible: boolean = false;
  isApplyTextVisible: boolean = false;
  region_details_d:any[]=[];
  region_name:string='';


  inspectors_name_d: string[] = [];
  inspectors_name: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchStatus1Records();
    this.fetchInspectors();
    this.fetchregion();
  }

  fetchStatus1Records(): void {
    const apiUrl = `${environment.serverUrl}api/inf-status-1`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.status1Records = data.map(record => ({
          ...record,
          selectedOption: 'report' // Default selection
        }));
        this.filteredStatus1Records = this.status1Records;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching status 1 records:', error);
        this.errorMessage = 'Failed to load status 1 records';
        this.isLoading = false;
      }
    });
  }

  fetchregion(): void {
    const regionUrl = `${environment.serverUrl}api/region-drop`;
    this.http.get<string[]>(regionUrl).subscribe(
      data => {
        this.region_details_d = data;
      },
      error => {
        console.error('Error fetching inspector names:', error);
      }
    );
  }

  fetchInspectors(): void {
    const inspectorsUrl = `${environment.serverUrl}api/inspector-name-drop`;
    this.http.get<string[]>(inspectorsUrl).subscribe(
      (data) => {
        this.inspectors_name_d = data;
        console.log('Inspector name dropdown:', this.inspectors_name_d);
      },
      (error) => {
        console.error('Error fetching inspector names:', error);
      }
    );
  }




  filterRecords(): void {
    console.log('Inspector:', this.inspectors_name);
  
    const normalizedInspectorName = this.inspectors_name?.trim().toLowerCase() || '';
    const normalizedLocation = this.location?.trim().toLowerCase() || '';
    const normalizedRegion = this.region_name?.trim().toLowerCase() || '';
  
    const today = new Date();
  
    // Calculate first and last days of the current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    // Calculate first and last days of the previous month
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
    // Calculate three months ago
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  
    // Calculate six months ago
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
  
    // Calculate one year ago
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  
    this.filteredStatus1Records = this.status1Records.filter((record) => {
      const inspectorMatch = !this.inspectors_name || 
        record.inspector_list.trim().toLowerCase().includes(normalizedInspectorName);
  
      const locationMatch = !this.location || 
        record.location.trim().toLowerCase().includes(normalizedLocation);
  
      const regionMatch = !this.region_name || 
        record.region.trim().toLowerCase().includes(normalizedRegion);
  
      const dateMatch =
        (!this.fromDate || new Date(record.schedule_from) >= new Date(this.fromDate)) &&
        (!this.toDate || new Date(record.schedule_to) <= new Date(this.toDate));
  
      let timeFilterMatch = true;
  
      // Apply filter based on selected option
      if (this.selectedFilter === 'thisMonth') {
        timeFilterMatch = new Date(record.schedule_from) >= firstDayOfMonth && new Date(record.schedule_from) <= lastDayOfMonth;
      } else if (this.selectedFilter === 'lastMonth') {
        timeFilterMatch = new Date(record.schedule_from) >= firstDayOfLastMonth && new Date(record.schedule_from) <= lastDayOfLastMonth;
      } else if (this.selectedFilter === 'last3Months') {
        timeFilterMatch = new Date(record.schedule_from) >= threeMonthsAgo && new Date(record.schedule_from) <= today;
      } else if (this.selectedFilter === 'last6Months') {
        timeFilterMatch = new Date(record.schedule_from) >= sixMonthsAgo && new Date(record.schedule_from) <= today;
      } else if (this.selectedFilter === 'lastYear') {
        timeFilterMatch = new Date(record.schedule_from) >= oneYearAgo && new Date(record.schedule_from) <= today;
      }
  
      return inspectorMatch && locationMatch && regionMatch && dateMatch && timeFilterMatch;
    });
  }
  
  

  
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.isDateRangeFieldsVisible = false;
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
     const target = event.target as HTMLSelectElement;
    this.isDateRangeFieldsVisible = target.value === 'date-range'; // Show/hide based on selection
  }

  // Apply filter logic
  applyFilter(): void {
    alert('Filter applied!');
    this.isApplyTextVisible = true; // Show apply text when filter is applied
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



  
  

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStatus1Records = this.status1Records.filter(record =>
      record.contract_number.toLowerCase().includes(searchTerm) ||
      record.project_name.toLowerCase().includes(searchTerm) ||
      record.location.toLowerCase().includes(searchTerm)
    );
  }




  exportAllToExcel(): void {
    // Prepare data for Excel by including all record properties
    const data = this.filteredStatus1Records.map(record => {
      // If the inspector_list is stringified, parse it for readability
      if (typeof record.inspector_list === 'string' && record.inspector_list.startsWith('[')) {
        try {
          record.inspector_list = JSON.parse(record.inspector_list).join(', ');
        } catch (error) {
          console.error("Error parsing inspector_list:", error);
        }
      }

      return { ...record };
    });

    // Create a worksheet and workbook
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Active Schedules': worksheet },
      SheetNames: ['Active Schedules']
    };

    // Generate Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Active_Schedules');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }





















  redirect(record: any, contract_no: string): void {
    switch (record.selectedOption) {
      case 'report':
        this.router.navigate(['afterlogin', 'report_dashview', contract_no]);
        break;
        case 'excel_reports':
          this.router.navigate(['afterlogin', 'excel_reports', contract_no]);
          break;  
      case 'key abstract':
        this.router.navigate(['afterlogin', 'key-abstract-dashview', contract_no]);
        break;
      case 'wcc':
        this.router.navigate(['afterlogin', 'wcc_dashview', contract_no]);
        break;
      case 'certificate':
        this.router.navigate(['afterlogin', 'certificate_dashview', contract_no]);
        break;
       
      default:
        console.error('No valid option selected');
    }
  }





}
