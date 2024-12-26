import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-inspection-analysis',
  templateUrl: './inspection-analysis.component.html',
  styleUrls: ['./inspection-analysis.component.scss']
})
export class InspectionAnalysisComponent {
  // val: string | null = '';
  // from_date: string | null = '';
  // to_date: string | null = '';
  
  infinspector: any[] = [];
  filteredData: any[] = []; // Declare the filteredData property
  searchTerm: string = '';
  fromDate: string = '';
  toDate: string = '';
  inspectors_name_d: string[] = [];
  region_details_d:any[]=[];
  region_name:string='';
  location: string = '';
  inspectors_name: string = '';
  selectedFilter: string = ''; 
  isPopupVisible: boolean = false;
  isDateRangeFieldsVisible: boolean = false;
  isApplyTextVisible: boolean = false;

  isLoading:boolean=true;

  constructor(
    private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,private cdr :ChangeDetectorRef
  ) {
    // this.route.paramMap.subscribe(params => {
    //   this.val = params.get('ins_name');
    //   this.from_date = params.get('from_date');
    //   this.to_date = params.get('to_date');
      
    //   if (this.val) {
    //     // Handle inspector name if necessary
    //   }
    // });
  }

  ngOnInit() {
    this.fetchinfinspectors();
    this. fetchInspectorsname();
    this.fetchregion();
    }

  fetchinfinspectors() {
    const params = new HttpParams()
      // .set('inspector_name', this.val || '')
      // .set('from_date', this.from_date || '')
      // .set('to_date', this.to_date || '');
      
    const apiUrl = `${environment.serverUrl}api/inspector-name-unit`;

    this.http.get<any[]>(apiUrl, { params })
      .subscribe(
        data => {
          console.log('count data:', data);  
          this.infinspector = data;
          this.filteredData = data;  // Initialize filteredData with the fetched data
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if necessary
          }, 100);
        },
        error => {
          console.error('Error fetching inspector details:', error);
          this.isLoading=false;
        }
      );
  }

  fetchInspectorsname(): void {
    const inspectorsUrl = `${environment.serverUrl}api/inspector-name-inspection-drop`;
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

  parseInspectorList(inspectorList: any): string {
    if (typeof inspectorList === 'string' && inspectorList.startsWith('[')) {
      try {
        const parsedArray = JSON.parse(inspectorList);
        return Array.isArray(parsedArray) ? parsedArray.join(', ') : inspectorList;
      } catch (error) {
        console.error("Error parsing inspectorList:", error);
      }
    }
    return inspectorList;
  }

  filterRecords(): void {
    let filtered = this.infinspector;
  
    // Apply date range filter
    if (this.fromDate && this.toDate) {
      filtered = filtered.filter(record => {
        const from = new Date(record.from_date);
        const to = new Date(record.to_date);
        return from >= new Date(this.fromDate) && to <= new Date(this.toDate);
      });
    }
  
    // Apply location filter
    if (this.location) {
      filtered = filtered.filter(record => record.location.toLowerCase().includes(this.location.toLowerCase()));
    }
  
    // Apply inspector name filter
    if (this.inspectors_name) {
      filtered = filtered.filter(record => record.inspector_name === this.inspectors_name);
    }
  
    // Apply region filter
    if (this.region_name) {
      filtered = filtered.filter(record => record.region === this.region_name);
    }
  
    // Apply time filter (thisMonth, lastMonth, last3Months, last6Months, lastYear)
    const today = new Date();
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  
    if (this.selectedFilter === 'thisMonth') {
      filtered = filtered.filter(record => {
        const fromDate = new Date(record.from_date);
        return fromDate >= firstDayOfThisMonth && fromDate <= lastDayOfThisMonth;
      });
    } else if (this.selectedFilter === 'lastMonth') {
      filtered = filtered.filter(record => {
        const fromDate = new Date(record.from_date);
        return fromDate >= firstDayOfLastMonth && fromDate <= lastDayOfLastMonth;
      });
    } else if (this.selectedFilter === 'last3Months') {
      filtered = filtered.filter(record => {
        const fromDate = new Date(record.from_date);
        return fromDate >= threeMonthsAgo && fromDate <= today;
      });
    } else if (this.selectedFilter === 'last6Months') {
      filtered = filtered.filter(record => {
        const fromDate = new Date(record.from_date);
        return fromDate >= sixMonthsAgo && fromDate <= today;
      });
    } else if (this.selectedFilter === 'lastYear') {
      filtered = filtered.filter(record => {
        const fromDate = new Date(record.from_date);
        return fromDate >= oneYearAgo && fromDate <= today;
      });
    }
  
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
    this.searchTerm = event.target.value.toLowerCase(); 
    this.filteredData = this.infinspector.filter(record =>
      record.inspector_name?.toLowerCase().includes(this.searchTerm) ||
      record.location?.toLowerCase().includes(this.searchTerm) ||
      record.project_name?.toLowerCase().includes(this.searchTerm) ||
      record.building_name?.toLowerCase().includes(this.searchTerm)
    );
  }


  exportToExcel(): void {
    // Prepare data for Excel by including all record properties
    const data = this.filteredData.map(record => {
      // If the inspector_list is stringified, parse it for readability
      if (typeof record.inspector_list === 'string' && record.inspector_list.startsWith('[')) {
        try {
          record.inspector_list = JSON.parse(record.inspector_list).join(', ');
        } catch (error) {
          console.error("Error parsing inspector_list:", error);
        }
      }
      
      // Return a new object that includes all properties of the record
      return { ...record };
    });

    // Create a worksheet from the data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Inspection Analysis': worksheet },
      SheetNames: ['Inspection Analysis']
    };

    // Generate Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Inspection_Analysis');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // Create a Blob from the buffer and save it as an Excel file
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }

  // ... (remaining existing methods)

  // Download button functionality
  downloadData(): void {
    this.exportToExcel(); // Call the export function when the download is initiated
  }


}
