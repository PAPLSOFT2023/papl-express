import { Component,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-report-pdf-viewer',
  templateUrl: './report-pdf-viewer.component.html',
  styleUrls: ['./report-pdf-viewer.component.scss']
})
export class ReportPdfViewerComponent {
  pdfData: Blob | undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute, private pdfService: ApicallService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const unit = this.route.snapshot.paramMap.get('unit');

    if (id) {
      this.pdfService.getPdfData1(id,unit).subscribe(data => {
        this.pdfData = data;
        const blob = new Blob([this.pdfData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if needed
        }, 1000);
        window.open(url);
      });
    }
  }


}
