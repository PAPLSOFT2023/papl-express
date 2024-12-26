import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-key-abstract-dashview',
  templateUrl: './key-abstract-dashview.component.html',
  styleUrls: ['./key-abstract-dashview.component.scss']
})
export class KeyAbstractDashviewComponent {

  
  keyabstractdashview: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  val:string| null='';
  isLoading:boolean = true;

  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private route:ActivatedRoute,private cdr :ChangeDetectorRef) {
    this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        // sessionStorage.setItem('document_id', this.val); 
      }


      
    });
  }
  ngOnInit() {
    this.fetchInfDetails();
  }

  fetchInfDetails(): void {
    this.http.get<any[]>(`${environment.serverUrl}api/keyabstract-dashpdf?encodedValue=${this.val}`)
      .subscribe(
        data => {
          console.log('Fetched data:', data);
          this.keyabstractdashview = data;
          this.filteredData = data; // Initialize filteredData with fetched data
          console.log('dash', this.keyabstractdashview);
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


  


  viewPdf(Id: string): void {
    const url = `${environment.serverUrl}api/keyabstractdashdown/${Id}`;
    window.open(url, '_blank');
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Search term:', this.searchTerm);
  
    // Filter the already fetched data stored in reportdashview
    this.filteredData = this.keyabstractdashview.filter(item =>
      item.contract.toLowerCase().includes(this.searchTerm) ||
      item.document_id.toLowerCase().includes(this.searchTerm) ||
      item.building_name.toLowerCase().includes(this.searchTerm) ||
      item.inspector_name.toLowerCase().includes(this.searchTerm)
    );
  
    console.log('Filtered data:', this.filteredData);
  }
  

  highlightText(text: string): SafeHtml {
    if (!this.searchTerm.trim()) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, `<span class="highlight">$1</span>`);
    console.log('Original text:', text);
    console.log('Highlighted text:', highlightedText);
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }


}
