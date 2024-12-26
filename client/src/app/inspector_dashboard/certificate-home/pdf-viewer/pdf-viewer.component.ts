import { Component,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  pdfData: Blob | undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute, private pdfService: ApicallService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const unit = this.route.snapshot.paramMap.get('unit');

    if (id) {
      this.pdfService.getPdfData(id,unit).subscribe(data => {
        this.pdfData = data;
        const blob = new Blob([this.pdfData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if needed
        });
        window.open(url);
      });
    }
  }

}
