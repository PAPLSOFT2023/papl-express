import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for HTTP requests
import QRCode from 'qrcode'; // Import QRCode library
import html2canvas from 'html2canvas'; // Import html2canvas library
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  showModal = false;
  qrCodeImageUrl: string | null = null; // Store the generated QR code image URL
  clientData: any = null; // Variable to store fetched data
  certificates: any[] = []; // Array to store the fetched certificate data
  isLoading = false; // Flag to show loading spinner during data fetch
  
  filteredCertificates: any[] = [];
  searchTerm: string = ''; // Variable for search term
 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCertificates(); // Fetch certificates on component load
  }

  generateQRCode(unit_name: string, document_id: string): void {
  if (!unit_name || !document_id) {
    console.error('Unit Name or Document ID is missing.');
    return; // Ensure both unit_name and document_id are available
  }

  this.showModal = true; // Show the modal

  // Construct the URL for the QR code
  const qrCodeUrl = `https://paplexpress.com/pdf_c/${document_id}/${unit_name}`;
  
  this.isLoading = true; // Set loading flag to true

  QRCode.toDataURL(qrCodeUrl, { width: 200 })
    .then((qrCodeDataUrl) => {
      // Create an HTML canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Canvas context not available.');
        this.isLoading = false;
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the saffron half
        ctx.fillStyle = '#FF9933'; // Saffron color
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

        // Draw the blue half
        ctx.fillStyle = '#0000FF'; // Blue color
        ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

        // Set blend mode to overlay the QR code
        ctx.globalCompositeOperation = 'source-atop';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert the final canvas to a data URL
        this.qrCodeImageUrl = canvas.toDataURL();
        console.log('QR code with saffron and blue colors generated successfully.');
        this.isLoading = false;
      };

      img.src = qrCodeDataUrl; // Set the QR code image as the source
    })
    .catch((error: any) => {
      console.error('Error generating QR code:', error);
      this.isLoading = false;
    });
}

 // Watch for changes in the searchTerm and filter certificates
 ngOnChanges(): void {
  this.filterCertificates();
}


filterCertificates(): void {
  const search = this.searchTerm.toLowerCase();
  this.filteredCertificates = this.certificates.filter((certificate) => {
    return (
      certificate.inspector_name?.toLowerCase().includes(search) ||
      certificate.building_name?.toLowerCase().includes(search) ||
      certificate.project_name?.toLowerCase().includes(search) ||
      certificate.unit_name?.toLowerCase().includes(search) ||
      certificate.contract?.toLowerCase().includes(search) ||
      certificate.document_id?.toLowerCase().includes(search)
    );
  });
}
  

  getCertificates(): void {
    this.isLoading = true; // Set loading flag to true when starting the HTTP request

    this.http.get<any[]>(`${environment.serverUrl}api/fetch_certificate`).subscribe(
      (response) => {
        this.certificates = response; // Store the fetched data in the certificates array
        this.filteredCertificates = response; // Initialize filtered list
        console.log('Fetched certificates:', this.certificates);
        this.isLoading = false; // Set loading flag to false after data is fetched
      },
      (error) => {
        console.error('Error fetching certificates:', error);
        this.isLoading = false; // Set loading flag to false if error occurs
      }
    );
  }

  async downloadQRCode(): Promise<void> {
    const qrContainer = document.querySelector('.qr-code-container') as HTMLElement;
    if (!qrContainer) return;
  
    this.isLoading = true; // Set loading flag to true during image generation
  
    try {
      const canvas = await html2canvas(qrContainer); // Capture the container as an image
      const imageData = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'QRCodeWithText.png';
      link.click();
      console.log('QR code with text downloaded successfully.');
  
      this.closeModal(); // Automatically close the modal after download
    } catch (error) {
      console.error('Error downloading QR code with text:', error);
    } finally {
      this.isLoading = false; // Reset loading flag after download
    }
  }
  
  closeModal(): void {
    this.showModal = false; // Hide the modal
    this.qrCodeImageUrl = null; // Clear the QR code image URL
  }
}


