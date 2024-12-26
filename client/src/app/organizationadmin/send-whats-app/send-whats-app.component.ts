import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-whats-app',
  templateUrl: './send-whats-app.component.html',
  styleUrls: ['./send-whats-app.component.scss']
})
export class SendWhatsAppComponent {
  reports: any[] = []; // Array to hold the reports

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReports(); // Fetch reports on initialization
  }

  // Method to fetch all reports
  fetchReports(): void {
    this.http.get<any[]>('http://localhost:3000/api/reports_fetch').subscribe(
      (data) => {
        this.reports = data; // Set the reports from the response
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  // Method to send WhatsApp message with the PDF
  // sendWhatsApp(documentId: string): void {
  //   this.http.post(`http://localhost:3000/api/reports/send-whatsapp/${documentId}`, {}).subscribe(
  //     (response) => {
  //       console.log('WhatsApp message sent successfully:', response);
  //       alert('WhatsApp message sent successfully!');
  //     },
  //     (error) => {
  //       console.error('Error sending WhatsApp message:', error);
  //       alert('Failed to send WhatsApp message.');
  //     }
  //   );
  // }

  // sendEmail(documentId: string) {
  //   this.http.post('http://localhost:3000/send-email', { documentId }).subscribe(
  //     (response) => {
  //       console.log('Email sent:', response);
  //       alert('Email sent successfully!');
  //     },
  //     (error) => {
  //       console.error('Error sending email:', error);
  //       alert('Error sending email.');
  //     }
  //   );
  // }
  sendEmail(documentId: string, customerName: string, projectName: string) {
    this.http.post('http://localhost:3000/send-email', { 
      documentId, 
      clientContactName: customerName, 
      projectName 
    }).subscribe(
      (response) => {
        console.log('Email sent:', response);
        alert('Email sent successfully!');
      },
      (error) => {
        console.error('Error sending email:', error);
        alert('Error sending email.');
      }
    );
  }
}
