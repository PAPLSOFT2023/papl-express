
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

// Define an interface for the inspection record
interface InspectionRecord {
    contract_number: string;
    region: string;
    project_name: string;
    type_of_inspection: string;
    id: string;
    inspector_list: string; // Keep as string
    schedule_from: string;
    schedule_to: string;
    oem_details: string;
    oem:string;
    document_id?: string; // Optional if breif_spec data may not be present
}

@Component({
    selector: 'app-msf24',
    templateUrl: './msf24.component.html',
    styleUrls: ['./msf24.component.scss']
})
export class Msf24Component implements OnInit {
    inf26Data: InspectionRecord[] = []; // To hold the fetched data

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getDataFromDatabase();
    }

    // Function to get data from the Node.js server
    getDataFromDatabase(): void {
        this.http.get<{ data: InspectionRecord[] }>('http://localhost:3000/api/msf24')
            .subscribe(
                (response) => {
                    this.inf26Data = response.data; // Accessing the array from the response
                    console.log('Data fetched:', this.inf26Data);
                },
                (error) => {
                    console.error('Error fetching data:', error);
                }
            );
    }

    // Function to format date from ISO 8601 to dd/mm/yyyy
    formatDate(dateString: string): string {
        const date = new Date(dateString); // Convert to Date object
        const day = ('0' + date.getDate()).slice(-2); // Get day and pad with zero if needed
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month (0-indexed) and pad with zero
        const year = date.getFullYear(); // Get full year
        return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
    }

    // Function to download data as an Excel file
    downloadExcel(): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.inf26Data);
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'MSF24 Data');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'msf24_data.xlsx');
    }

    // Function to extract name and number from inspector_list
    formatInspectorList(inspectorList: string): string {
        // Check if inspectorList is null or undefined
        if (!inspectorList) {
            return ''; // Return an empty string if inspectorList is null or undefined
        }
        // Remove brackets and quotes, then split the string by ' - ' and return the formatted name
        const cleanList = inspectorList.replace(/[\[\]"']+/g, '').trim();
        return cleanList.split(' - ')[0]; // Return only the name
    }
}
