

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { jsPDF } from 'jspdf';               // Import jsPDF
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

@Component({
  selector: 'app-feedback-pdf',
  templateUrl: './feedback-pdf.component.html',
  styleUrls: ['./feedback-pdf.component.scss']
})
export class FeedbackPdfComponent {


  feedback: any[] = [];
  question: any[] = [];

  isLoading = true;
  searchQuery: string = ''; // Declare search query



  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchfeedback();
    this.fetchquestion();

  }

  // Fetch feedback data from the API
  fetchfeedback(): void {
    const apiUrl = `${environment.serverUrl}api/feedbackdash`;  // Make sure to adjust the URL for your API

    this.isLoading = true;  // Show loading indicator
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('Fetched data:', data); // Log the fetched data
        this.feedback = data;  // Assign the data to feedback


        this.isLoading = false;  // Hide the loading indicator
        this.cdr.detectChanges();  // Ensure change detection is triggered if necessary
      },
      error: (error) => {
        console.error('Error fetching report:', error);
        this.isLoading = false;  // Hide loading indicator on error
      }
    });
  }
  parseJSON(rating: string): number[][] {
    try {
      return JSON.parse(rating); // Parse JSON string to array
    } catch (error) {
      console.error('Error parsing rating JSON:', error);
      return []; // Return an empty array in case of error
    }
  }

  fetchquestion(): void {
    const apiUrl = `${environment.serverUrl}api/feedbackquestion`;  // Make sure to adjust the URL for your API

    this.isLoading = true;  // Show loading indicator
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('question:', data); // Log the fetched data
        this.question = data;  // Assign the data to feedback

      },
      error: (error) => {
        console.error('Error fetching report:', error);
      }
    });
  }


  searchDocument(): void {
    const query = this.searchQuery.trim();
    if (query) {
      // Filter feedback based on document_id and contract_number, with null/undefined checks
      this.feedback = this.feedback.filter(record =>
        (record.document_id && record.document_id.toString().includes(query)) ||
        (record.contract_number && record.contract_number.toString().includes(query))
      );
    } else {
      // If search query is empty, reset the feedback list
      this.fetchfeedback();
    }
  }

  extractDetails(customerDetails: string): string {
    if (!customerDetails) {
      return ''; // Handle null or undefined values
    }

    try {
      const parsedData = JSON.parse(customerDetails);

      // Return formatted string with 'name' and 'designation'
      const name = parsedData?.name || 'N/A';
      // const designation = parsedData?.designation || 'N/A';
      // return `name: ${name}, designation: ${designation}`;
      return name;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return ''; // Handle JSON parsing errors gracefully
    }
  }


  extractDetails1(customerDetails: string): string {
    if (!customerDetails) {
      return ''; // Handle null or undefined values
    }

    try {
      const parsedData = JSON.parse(customerDetails);

      const designation = parsedData?.designation || 'N/A';
      return designation;
    }
    catch (error) {
      console.error('Error parsing JSON:', error);
      return ''; // Handle JSON parsing errors gracefully
    }
  }


  extractDetails2(customerDetails: string): string {
    if (!customerDetails) {
      return ''; // Handle null or undefined values
    }

    try {
      const parsedData = JSON.parse(customerDetails);

      // Corrected the key to contactNo (camel case)
      const contactNo = parsedData?.contactNo || 'N/A';

      return contactNo;
    }
    catch (error) {
      console.error('Error parsing JSON:', error);
      return ''; // Handle JSON parsing errors gracefully
    }
  }

  extractDetails3(customerDetails: string): string {
    if (!customerDetails) {
      return ''; // Handle null or undefined values
    }

    try {
      const parsedData = JSON.parse(customerDetails);

      const emailId = parsedData?.emailId || 'N/A';
      return emailId;
    }
    catch (error) {
      console.error('Error parsing JSON:', error);
      return ''; // Handle JSON parsing errors gracefully
    }
  }

  extractDetails4(customerDetails: string): string {
    if (!customerDetails) {
      return ''; // Handle null or undefined values
    }

    try {
      const parsedData = JSON.parse(customerDetails);

      // Extract the signature URL or Base64
      const signature = parsedData?.signature || '';
      if (signature.startsWith('data:image/') || signature.startsWith('http')) {
        return signature; // Return valid image URL or Base64 string
      }

      return ''; // If invalid, return empty string
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return ''; // Gracefully handle JSON errors
    }
  }

  formatOptions(options: string): string {
    try {
      const optionsObj = JSON.parse(options); // Parse the options JSON
      return Object.values(optionsObj)
        .filter(value => typeof value === 'string' && value.trim() !== '') // Filter non-empty strings
        .join('\n'); // Join the values with newlines
    } catch (error) {
      console.error('Error parsing options JSON:', options, 'Error:', error);
      return '';
    }
  }






  downloadPDF(record: any) {
    const doc = new jsPDF();  // Create a new jsPDF document
    doc.setFontSize(16);  // Set font size for the heading
    doc.setFont("calibri", "bold");  // Set font style for the heading
    doc.text('Inspection Feedback Form', 70, 10);  // Add the heading at (x: 20, y: 20)

    // Define headers
    const headers = ['Field', 'Value'];

    const feedbackRows = [
      ['S.NO', 'FIELD', 'VALUE'], // Table headers
      ...[
        ['CONTRACT NO', record.contract_number],
        ['DOCUMENT ID', record.document_id],
        ['BUILDING NAME', record.building_name],
        ['PROJECT NAME', record.project_name],
        ['INSPECTOR NAME', record.inspector_name],
        ['LOCATION', record.location],
        ['REGION', record.region],
        ['FROM DATE', new Date(record.from_date).toLocaleDateString()],
        ['TO DATE', new Date(record.to_date).toLocaleDateString()],
        ['CUSTOMER NAME', this.extractDetails(record.customer_details)],
        ['DESIGNATION', this.extractDetails1(record.customer_details)],
        ['CONTACT NO', this.extractDetails2(record.customer_details)],
        ['EMAIL ID', this.extractDetails3(record.customer_details)],
      ].map((row, index) => [index + 1, ...row]), // Add serial numbers
    ];


    // signature---------------------------------------------------------------------------------------

    autoTable(doc, {

    });

    const signature = this.extractDetails4(record.customer_details);

    if (signature) {
      const imgWidth = 50; // Width of the image in the PDF
      const imgHeight = 20; // Height of the image in the PDF
      const xPos = 110; // X coordinate in the PDF
      const yPos = doc.lastAutoTable.finalY + 240; // Y position after the table
      const padding = 5; // Padding around the signature

      // Draw a square around the signature
      doc.setDrawColor(0); // Set the border color (black)
      doc.setLineWidth(0.5); // Set the line width
      doc.rect(
        xPos + 30 - padding, // X position for the square
        yPos - padding - 5,  // Y position for the square
        imgWidth + 2 * padding, // Width of the square (image width + padding)
        imgHeight + 2 * padding // Height of the square (image height + padding)
      );

      // Add the signature image
      doc.text('SIGNATURE', xPos - -38, yPos - 12); // Label for the signature
      doc.addImage(signature, 'JPEG', xPos + 30, yPos - 5, imgWidth, imgHeight);
    } else {
      doc.text('SIGNATURE: N/A', 20, doc.lastAutoTable.finalY + 10);
    }


    // feedback table---------------------------------------------------------------------------------

    autoTable(doc, {
      head: [feedbackRows[0]], // Use the first row as the header
      body: feedbackRows.slice(1), // Use the rest as the body
      startY: 20,
      theme: 'grid',
      styles: {
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: 0.25,
        halign: 'center',
      },
      headStyles: {
        fillColor: [3, 161, 252],
        halign: 'center',
      },
    });


    // question---------------------------------------------------------------------------------

    let yOffset = doc.lastAutoTable.finalY + 10; // Get position after feedback table

    // ------------------------------------------------------------------
    const formatOptions = (options: string): Record<string, string> => {
      try {
        const optionsObj = JSON.parse(options); // Parse the options JSON
        console.log('Parsed options:', optionsObj);
        return optionsObj; // Return the options object directly
      } catch (error) {
        console.error('Error parsing options JSON:', options, 'Error:', error);
        return {}; // Return an empty object if parsing fails
      }
    };

    // Assuming `record.options` is a string or object that contains all options for the questions
    const formattedOptions = formatOptions(record.options); // Parse options once and store as an object

    // Log the entire formatted options object
    console.log('Formatted options object:', formattedOptions);

    // Map the questions, ratings, and corresponding options
    const ratingData = this.question.map((item, i) => {
      // Get the rating for the current question (if it exists)
      const ratingForThisQuestion = record.ratingCounts[i] || ''; // Default to empty string if no rating
      console.log(`Rating for question ${i + 1}:`, ratingForThisQuestion);

      // Get the option for the current question based on its index (use option1, option2, ...)
      const optionKey = `option${i + 1}`;
      const optionForThisQuestion = formattedOptions[optionKey] || ''; // Get option for this question or empty string if not found
      console.log(`Option for question ${i + 1}:`, optionForThisQuestion);

      // Return an array for each row: [Question, Rating, Option]
      return [item.question, ratingForThisQuestion, optionForThisQuestion];
    });

    // Log the final rating data before passing it to autoTable
    console.log('Final rating data:', ratingData);


    // ---------------------------------------------------------------

    const ratingDataWithSerialNumbers = ratingData.map((row, index) => [
      (index + 1).toString(), // Serial number (1-based index)
      ...row,                // Spread the rest of the row data (question, rating, feedback)
    ]);

    autoTable(doc, {
      head: [
        [
          'S.NO',
          'OBSERVATION AND REVIEW POINT FROM LOW TO HIGH',
          'RATING',
          'FEEDBACK',
        ]
      ],
      body: ratingDataWithSerialNumbers,  // Use the data with serial numbers
      startY: yOffset,  // Start the table after the previous content
      theme: 'grid',  // Table theme
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.25,
        halign: 'center',  // Center-align table content
      },
      headStyles: {
        fillColor: [3, 161, 252],  // Header color
        halign: 'center',
      },
    });




    // const sanitizedDocumentId = String(record.document_id).replace(/[^a-zA-Z0-9-_]/g, '');
    // doc.save(`feedback-${sanitizedDocumentId}.pdf`);
    // doc.save(`feedback-${record.document_id}.pdf`);

    // const fileName = `feedback-${record.document_id}.pdf`;
    // console.log('File Name:', fileName);
    // doc.save(fileName);

    doc.save(`feedback-${record.document_id}.pdf`);





  }














  downloadExcel(record: any) {
    // Define the feedback data
    const feedbackData = [
      { 'S.NO': 1, FIELD: 'CONTRACT NO', VALUE: record.contract_number },
      { 'S.NO': 2, FIELD: 'DOCUMENT ID', VALUE: record.document_id },
      { 'S.NO': 3, FIELD: 'BUILDING NAME', VALUE: record.building_name || 'N/A' },
      { 'S.NO': 4, FIELD: 'PROJECT NAME', VALUE: record.project_name },
      { 'S.NO': 5, FIELD: 'INSPECTOR NAME', VALUE: record.inspector_name },
      { 'S.NO': 6, FIELD: 'LOCATION', VALUE: record.location },
      { 'S.NO': 7, FIELD: 'REGION', VALUE: record.region },
      { 'S.NO': 8, FIELD: 'FROM DATE', VALUE: new Date(record.from_date).toLocaleDateString() },
      { 'S.NO': 9, FIELD: 'TO DATE', VALUE: new Date(record.to_date).toLocaleDateString() },
      { 'S.NO': 10, FIELD: 'CUSTOMER NAME', VALUE: this.extractDetails(record.customer_details) },
      { 'S.NO': 11, FIELD: 'DESIGNATION', VALUE: this.extractDetails1(record.customer_details) },
      { 'S.NO': 12, FIELD: 'CONTACT NO', VALUE: this.extractDetails2(record.customer_details) },
      { 'S.NO': 13, FIELD: 'EMAIL ID', VALUE: this.extractDetails3(record.customer_details) },
      {},
      {},
      {},



    ];

    // Function to parse options JSON
    const formatOptions = (options: string): Record<string, string> => {
      try {
        const optionsObj = JSON.parse(options); // Parse the options JSON
        console.log('Parsed options:', optionsObj);
        return optionsObj; // Return the options object directly
      } catch (error) {
        console.error('Error parsing options JSON:', options, 'Error:', error);
        return {}; // Return an empty object if parsing fails
      }
    };

    // Assuming `record.options` is a string or object that contains all options for the questions
    const formattedOptions = formatOptions(record.options); // Parse options once and store as an object

    // Log the entire formatted options object
    console.log('Formatted options object:', formattedOptions);

    // Map the questions, ratings, and corresponding options
    const ratingData = this.question.map((item, i) => {
      // Get the rating for the current question (if it exists)
      const ratingForThisQuestion = record.ratingCounts[i] || ''; // Default to empty string if no rating
      console.log(`Rating for question ${i + 1}:`, ratingForThisQuestion);

      // Get the option for the current question based on its index (use option1, option2, ...)
      const optionKey = `option${i + 1}`;
      const optionForThisQuestion = formattedOptions[optionKey] || ''; // Get option for this question or empty string if not found
      console.log(`Option for question ${i + 1}:`, optionForThisQuestion);

      // Return an array for each row: [Question, Rating, Option]
      return {
        'S.NO': i + 1,
        FIELD: item.question,
        RATING: ratingForThisQuestion,
        FEEDBACK: optionForThisQuestion,
      };
    });

    // Log the final rating data before passing it to autoTable
    console.log('Final rating data:', ratingData);

    // Combine feedback and rating data
    const combinedData = [...feedbackData, ...ratingData];

    // Create a new worksheet from the combined data
    const worksheet = XLSX.utils.json_to_sheet(combinedData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');

    // Generate Excel file and download it
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `feedback-${record.document_id}.xlsx`);
  }

}

