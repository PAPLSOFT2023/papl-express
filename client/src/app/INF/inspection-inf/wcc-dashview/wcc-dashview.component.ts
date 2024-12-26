import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wcc-dashview',
  templateUrl: './wcc-dashview.component.html',
  styleUrls: ['./wcc-dashview.component.scss']
})
export class WccDashviewComponent {


  pdfStorageData: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  val:string| null='';
  isLoading:boolean=true;
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private route:ActivatedRoute,private cdr :ChangeDetectorRef) {
    this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        // sessionStorage.setItem('document_id', this.val); 
      }


      
    });
  }

  ngOnInit(): void {
    this.loadPdfStorageData();
  }

  loadPdfStorageData(): void {
    this.http.get<any[]>(`${environment.serverUrl}api/pdf-storage?encodedValue=${this.val}`)


      .subscribe(
        (data) => {
          console.log('Data loaded:', data); // Debug: Log loaded data
          this.pdfStorageData = data;
          this.filteredData = [...this.pdfStorageData];
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if necessary
          }, 100);
        },
        (error) => {
          console.error('Error loading PDF storage data:', error);
          this.isLoading=false;
        }
      );
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Search term:', this.searchTerm); // Debug: Log search term
    this.filteredData = this.pdfStorageData.filter(pdf =>
      pdf.contract_no.toLowerCase().includes(this.searchTerm) ||
      pdf.documentId.toLowerCase().includes(this.searchTerm) ||
      pdf.building_name.toLowerCase().includes(this.searchTerm) ||
      pdf.inspector_name.toLowerCase().includes(this.searchTerm)
    );
    console.log('Filtered data:', this.filteredData); // Debug: Log filtered data
  }

  highlightText(text: string): SafeHtml {
    if (!this.searchTerm.trim()) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, `<span class="highlight">$1</span>`);
    console.log('Original text:', text); // Debug: Log original text
    console.log('Highlighted text:', highlightedText); // Debug: Log highlighted text
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }

  viewPdf(Id: string): void {
    const url = `${environment.serverUrl}api/pdf/${Id}`;
    window.open(url, '_blank');
  }

  logColorChanges(): void {
    const elements = document.querySelectorAll('.highlight');
    elements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      console.log('Element:', element);
      console.log('Background color:', computedStyle.backgroundColor);
      console.log('Font weight:', computedStyle.fontWeight);
    });
  }

}
