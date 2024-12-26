
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-approval-report',
  templateUrl: './approval-report.component.html',
  styleUrls: ['./approval-report.component.scss']
})
export class ApprovalReportComponent {

  
  approvalreport: any[] = [];
  filteredRecords: any[] = [];
  isLoading = true;


  constructor(private http: HttpClient,private cdr :ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchApprovalReport();
  }

  fetchApprovalReport(): void {
    const apiUrl = `${environment.serverUrl}api/approval-reporta`;
  
    this.isLoading = true;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('Fetched data:', data); // Log response
        this.approvalreport = data;
        this.filteredRecords = [...data]; // Set filteredRecords initially
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching report:', error);
        this.isLoading = false;
      }
    });
  }
  
  





  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
  
    // Apply search to the filtered records (current month)
    this.filteredRecords = this.approvalreport
     
      .filter(record =>
        record.contract.toLowerCase().includes(searchTerm) ||
        record.building_name.toLowerCase().includes(searchTerm) ||
        record.unit_name.toLowerCase().includes(searchTerm) ||
        record.inspector_name.toLowerCase().includes(searchTerm) ||
        record.document_id.toLowerCase().includes(searchTerm)
      );
  }
  

  viewPdf(Id: string): void {
    const url = `${environment.serverUrl}api/reportapprovalpdf/${Id}`;
    window.open(url, '_blank');
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


}

