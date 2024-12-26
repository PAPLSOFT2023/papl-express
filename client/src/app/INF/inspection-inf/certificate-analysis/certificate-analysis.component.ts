import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-certificate-analysis',
  templateUrl: './certificate-analysis.component.html',
  styleUrls: ['./certificate-analysis.component.scss']
})

export class CertificateAnalysisComponent {
  certificateanalysis: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  inspectors_name_d: string[] = [];
  inspectors_name: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedFilter: string = '';  // Holds 'lastMonth' or 'last3Months'
  region_details_d:any[]=[];
  region_name:string='';
  location: string = '';
  isPopupVisible: boolean = false;
  isDateRangeFieldsVisible: boolean = false;
  isApplyTextVisible: boolean = false;
  isLoading:boolean=true;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute,private cdr :ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchInfDetails();
    this.fetchInspectors();
    this.fetchregion();
  }

  fetchInfDetails(): void {
    this.http.get<any[]>(`${environment.serverUrl}api/certificate-analysispdf`).subscribe(
      data => {
        this.certificateanalysis = data;
        this.filteredData = data;
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if necessary
        }, 100);
      },
      error => {
        console.error('Error fetching details:', error);
        this.isLoading=false;
      }
    );
  }

  fetchInspectors(): void {
    const inspectorsUrl = `${environment.serverUrl}api/inspector-name-certificate-drop`;
    this.http.get<string[]>(inspectorsUrl).subscribe(
      data => {
        this.inspectors_name_d = data;
      },
      error => {
        console.error('Error fetching inspector names:', error);
      }
    );
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

  filterRecords(): void {
    let filtered = this.certificateanalysis;
  
    // Apply date range filter
    if (this.fromDate && this.toDate) {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= new Date(this.fromDate) && uploadedAt <= new Date(this.toDate);
      });
    }
  
    // Apply inspector name filter
    if (this.inspectors_name) {
      filtered = filtered.filter(record => record.inspector_name === this.inspectors_name);
    }
  
    // Apply location filter (case-insensitive and handle null/undefined)
    if (this.location) {
      filtered = filtered.filter(record => 
        record.location && record.location.toLowerCase().includes(this.location.toLowerCase())
      );
    }
  
    // Apply region name filter (exact match and handle null/undefined)
    if (this.region_name) {
      filtered = filtered.filter(record => 
        record.region && record.region === this.region_name
      );
    }
  
    // Get the current date and define time ranges for filtering
    const today = new Date();
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  
    // Apply the selected time-based filter
    if (this.selectedFilter === 'thisMonth') {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= firstDayOfThisMonth && uploadedAt <= lastDayOfThisMonth;
      });
    } else if (this.selectedFilter === 'lastMonth') {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= firstDayOfLastMonth && uploadedAt <= lastDayOfLastMonth;
      });
    } else if (this.selectedFilter === 'last3Months') {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= threeMonthsAgo && uploadedAt <= today;
      });
    } else if (this.selectedFilter === 'last6Months') {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= sixMonthsAgo && uploadedAt <= today;
      });
    } else if (this.selectedFilter === 'lastYear') {
      filtered = filtered.filter(record => {
        const uploadedAt = new Date(record.uploaded_at);
        return uploadedAt >= oneYearAgo && uploadedAt <= today;
      });
    }
  
    // Update filtered data
    this.filteredData = filtered;
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

  // // Download button functionality
  // downloadData(): void {
  //   alert('Download initiated!');
  // }

  // Handle clicks outside of the popup to close it
  onWindowClick(event: Event): void {
    const target = event.target as HTMLElement;
    const popup = document.getElementById('filterPopup');
    const filterButton = document.querySelector('.filter-icon-btn');

    if (popup && filterButton && target !== popup && !popup.contains(target) && target !== filterButton) {
      this.isPopupVisible = false;
    }
  }



  viewPdf(Id: string): void {
    const url = `${environment.serverUrl}api/certificate-analysis-view/${Id}`;
    window.open(url, '_blank');
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.certificateanalysis.filter(item =>
      item.contract.toLowerCase().includes(this.searchTerm) ||
      item.document_id.toLowerCase().includes(this.searchTerm) ||
      item.building_name.toLowerCase().includes(this.searchTerm) ||
      item.location.toLowerCase().includes(this.searchTerm) ||
      item.project_name.toLowerCase().includes(this.searchTerm) ||


      item.inspector_name.toLowerCase().includes(this.searchTerm)
    );
  }

  highlightText(text: string): SafeHtml {
    if (!this.searchTerm.trim()) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, `<span class="highlight">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }

  exportToExcel(): void {
    const data = this.filteredData.map(record => {
      if (typeof record.inspector_list === 'string' && record.inspector_list.startsWith('[')) {
        try {
          record.inspector_list = JSON.parse(record.inspector_list).join(', ');
        } catch (error) {
          console.error("Error parsing inspector_list:", error);
        }
      }
      return { ...record }; // Return all properties of the record
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Inspection Analysis': worksheet },
      SheetNames: ['Inspection Analysis']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Inspection_Analysis');
  }

  // Save the Excel file
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }

  // Download data button functionality
  downloadData(): void {
    this.exportToExcel(); // Call the export function when the download is initiated
  }


}
