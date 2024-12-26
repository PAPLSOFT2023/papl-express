import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-active-schedule',
  templateUrl: './active-schedule.component.html',
  styleUrls: ['./active-schedule.component.scss']
})
export class ActiveScheduleComponent {

  status1Records: any[] = [];
  filteredStatus1Records: any[] = [];
  isLoading = true;
  errorMessage: string = '';


  constructor(private http: HttpClient,private cdr :ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchStatus1Records();
  }

  fetchStatus1Records(): void {
    const apiUrl = `${environment.serverUrl}api/inf-status-1`;  // Use serverUrl from environment
    this.http.get<any[]>(apiUrl)
      .subscribe({
        next: (data) => {
          console.log('Status 1 Records:', data);
          this.status1Records = data;
          this.filterCurrentMonthRecords();  // Filter for the current month
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if necessary
          }, 100);          
        },
        error: (error) => {
          console.error('Error fetching status 1 records:', error);
          this.errorMessage = 'Failed to load status 1 records';
          this.isLoading = false;
        }
      });
  }

  filterCurrentMonthRecords(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    this.filteredStatus1Records = this.status1Records.filter(record => {
      const scheduleFrom = new Date(record.schedule_from);
      const scheduleTo = new Date(record.schedule_to);

      // Check if the schedule_from or schedule_to falls within the current month and year
      return (
        (scheduleFrom.getMonth() === currentMonth && scheduleFrom.getFullYear() === currentYear) ||
        (scheduleTo.getMonth() === currentMonth && scheduleTo.getFullYear() === currentYear)
      );
    });
  }

  parseInspectorList(inspectorList: any): string {
    if (typeof inspectorList === 'string' && inspectorList.startsWith('[')) {
      try {
        // Parse the string as an array and join the values
        const parsedArray = JSON.parse(inspectorList);
        return Array.isArray(parsedArray) ? parsedArray.join(', ') : inspectorList;
      } catch (error) {
        console.error("Error parsing inspectorList:", error);
      }
    }
    // If it's not a stringified array, return the original value
    return inspectorList;
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
  
    // Apply search to the filtered records (current month)
    this.filteredStatus1Records = this.status1Records
      .filter(record => {
        const scheduleFrom = new Date(record.schedule_from);
        const scheduleTo = new Date(record.schedule_to);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
  
        // Ensure that only records within the current month are searched
        return (
          (scheduleFrom.getMonth() === currentMonth && scheduleFrom.getFullYear() === currentYear) ||
          (scheduleTo.getMonth() === currentMonth && scheduleTo.getFullYear() === currentYear)
        );
      })
      .filter(record =>
        record.contract_number.toLowerCase().includes(searchTerm) ||
        record.project_name.toLowerCase().includes(searchTerm) ||
        record.inspector_list.toLowerCase().includes(searchTerm) ||
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
    const workbook: XLSX.WorkBook = { Sheets: { 'Active Schedules': worksheet }, SheetNames: ['Active Schedules'] };

    // Generate Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Active_Schedules');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }


}
