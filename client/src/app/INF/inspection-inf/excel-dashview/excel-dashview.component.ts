
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-excel-dashview',
  templateUrl: './excel-dashview.component.html',
  styleUrls: ['./excel-dashview.component.scss']
})
export class ExcelDashviewComponent {


  val:string| null='';

  exceldata: any[] = []; // Full dataset from API
  filteredData: any[] = []; // Filtered dataset for display
  searchTerm: string = ''; // Search input value


  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private route:ActivatedRoute,private cdr :ChangeDetectorRef) {
    this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
      }


      
    });
  }
 

  ngOnInit(): void {
    this.fetchexcel();
  }



  fetchexcel(): void {
    const apiUrl = (`${environment.serverUrl}api/excel-report-dash?encodeValue=${this.val}`);

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('Fetched data:', data);
        this.exceldata = data;
        this.filteredData = [...data]; // Clone the data for filtering
      },
      error: (error) => {
        console.error('Error fetching report:', error);
      },
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim().toLowerCase();
  
    console.log('Search term:', searchTerm); // Debugging
  
    // Filter data with type check
    this.filteredData = this.exceldata.filter((record) =>
      (record.contract_no?.toString().toLowerCase().includes(searchTerm) || '') ||
      (record.documentidForUrl?.toString().toLowerCase().includes(searchTerm) || '')
    );
  
    console.log('Filtered data:', this.filteredData); // Debugging
  }
  

  viewexcel(Id: string): void {
    const url = `${environment.serverUrl}api/excelview/${Id}`;
    console.log('Opening URL: ', url);  // Log to verify the URL being used
    window.open(url, '_blank');
  }
  


}
