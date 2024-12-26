
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-excel-report',
  templateUrl: './excel-report.component.html',
  styleUrls: ['./excel-report.component.scss']
})
export class ExcelReportComponent {

  exceldata:any[]=[];
  constructor(private http: HttpClient) {}

 

  ngOnInit(): void {
    this.fetchexcel();
  }

  fetchexcel(): void {
    const apiUrl = `${environment.serverUrl}api/excel-reportins`;
  
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('Fetched data:', data); // Log response
        this.exceldata = data;
      },
      error: (error) => {
        console.error('Error fetching report:', error);
      }
    });
  }
  
 

  viewexcel(Id: string): void {
    const url = `${environment.serverUrl}api/excelview/${Id}`;
    console.log('Opening URL: ', url);  // Log to verify the URL being used
    window.open(url, '_blank');
  }
  






}


