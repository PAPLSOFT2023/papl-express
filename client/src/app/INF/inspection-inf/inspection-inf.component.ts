import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inspection-inf',
  templateUrl: './inspection-inf.component.html',
  styleUrls: ['./inspection-inf.component.css'] ,
  animations: [
    trigger('countAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class InspectionInfComponent  implements OnInit, OnDestroy{

  name: string | null = sessionStorage.getItem('UserName');
  dropdownVisible = false; // Track dropdown visibility
  showPopup = false; // Popup visibility state
  isVisible: boolean = false; // Account management popup visibility
  clientAdminData: any[] = [];

  animatedCount: number = 0;
  totalUnitsCount: number = 0;
  targetCount: number = 0;
  status1Count: number = 0; // Count of i_status 1
  status0Count: number = 0; // Count of i_status 0
  interval: any;
  unitDetails: any[] = [];
  RejectedCount:any[]=[];
  certificatecount:any[]=[];
  errorMessage: string = '';

  
  totalUnitsInspectedCount: number = 0;

  // Form data
  formData = {
    Username: '',
    email: '',
    password: '',
    picture: null as File | null
  };

  // Password visibility
  isPasswordVisible = false;

  // Image preview
  previewSrc: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.fetchTotalCount();
    this.getTotalUnitsCount();
    this.getInfCounts(); // Fetch counts for i_status
    window.addEventListener('click', this.closeDropdown.bind(this));
    this.fetchUnitsDetails();
    this.fetchRejectedCount();
    this.fetchcertificateCount();
    this.getClientAdminData();



  }

  // Method to toggle dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  ngOnDestroy() {
    // Clean up the event listener
    window.removeEventListener('click', this.closeDropdown.bind(this));
  }

  // Close dropdown if clicked outside
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownVisible = false;
    }
  }

  // // Fetch total count from the API and start animation
  // fetchTotalCount() {
  //   this.http.get<any>(`${environment.serverUrl}api/get-total-count`).subscribe(
  //     (data) => {
  //       this.targetCount = data.count;
  //       this.startCountAnimation(this.targetCount, (count) => this.animatedCount = count);
  //     },
  //     (error) => {
  //       console.error('Error fetching total count:', error);
  //     }
  //   );
  // }

  // Fetch total units count from the API and start animation
  getTotalUnitsCount(): void {
    this.http.get<{ totalUnits: number }>(`${environment.serverUrl}api/get-total-units-counts`).subscribe(
      (data) => {
        this.totalUnitsCount = data.totalUnits;
        this.startCountAnimation(this.totalUnitsCount, (count) => this.totalUnitsCount = count);
      },
      (error) => {
        console.error('Error fetching total units count:', error);
      }
    );
  }

  // Fetch counts of i_status 1 and 0 from the API
  getInfCounts(): void {
    this.http.get<{ status1Count: number, status0Count: number }>(`${environment.serverUrl}api/get-inf-counts`).subscribe(
      (data) => {
        this.status1Count = data.status1Count;
        this.status0Count = data.status0Count;
      },
      (error) => {
        console.error('Error fetching INF counts:', error);
      }
    );
  }





  fetchUnitsDetails() {
    this.http.get<any[]>(`${environment.serverUrl}api/fetch-unit-arrays`)
      .subscribe(
        data => {
          console.log('Fetched data:', data);
          this.unitDetails = data;
  
          // Calculate the total count of items in the unit_no arrays
          this.totalUnitsInspectedCount = this.unitDetails.reduce((sum, item) => {
            try {
              const unitArray = JSON.parse(item.unit_no); // Parse the JSON string to an array
              const length = unitArray.length; // Get the length of the array
              return sum + length; // Sum the lengths
            } catch (error) {
              console.error('Error parsing unit_no:', error);
              return sum; // Return the sum unchanged if there's an error
            }
          }, 0);
  
          console.log('Total units inspected:', this.totalUnitsInspectedCount); 
        },
        error => {
          console.error('Error fetching unit details:', error);
        }
      );
  }
  
 
  

  
  fetchRejectedCount() {  
    this.http.get<any>(`${environment.serverUrl}api/get-rejected-count`).subscribe(
      data => {
        console.log('Fetched data:', data);
        this.RejectedCount = data.total_rejected; // Access the sum from the response
        console.log('Total rejected count:', this.RejectedCount);
      },
      error => {
        console.error('Error fetching rejected count:', error);
      }
    );
  }

  fetchcertificateCount() {  
    this.http.get<any>(`${environment.serverUrl}api/get-certificate-count`).subscribe(
      data => {
        console.log('Fetched data:', data);
        this.certificatecount = data;
        console.log('certificate count:', this.certificatecount.length); // Log the count
      },
      error => {
        console.error('Error fetching certificate details:', error);
      }
    );
  }
  














  // Animate count value from 0 to target value
  startCountAnimation(target: number, update: (count: number) => void) {
    let currentCount = 0;
    const maxCount = target;
    const speed = 50; // Speed of the counting animation

    this.interval = setInterval(() => {
      currentCount += Math.ceil(maxCount / 100); // Increment by a fraction
      if (currentCount >= maxCount) {
        clearInterval(this.interval);
        currentCount = maxCount;
      }
      update(currentCount); // Update the specific count
    }, speed);
  }

  // Navigate to the sales list page
  redirect() {
    this.router.navigate(['afterlogin', 'schedule_status']);
  }

  // Navigate to the INF history page
  redirect1() {
    this.router.navigate(['afterlogin', 'scheduled_inf']);
  }

  // Navigate to the home page
  redirect2() {
    this.router.navigate(['afterlogin', 'insp_schedule_page']);
  }

  redirect3() {
    this.router.navigate(['afterlogin', 'RescheduleRequest']);
  }


  redirect4() {
    // this.router.navigate(['afterlogin', 'inspection_count']);
    this.router.navigate(['afterlogin', 'inspection_analysis' ]);

  }

  redirect5() {
    this.router.navigate(['afterlogin', 'certificate_analysis']);
  }

  // Open logout popup
  openLogoutPopup(): void {
    this.showPopup = true;
  }

  // Close logout popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Confirm logout
  confirmLogout(): void {
    this.router.navigate(['/login']);
  }


  openManageAccountPopup() {
    this.isVisible = true;
  }

  closePopup1() {
    this.isVisible = false;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

// Preview the selected image
previewImage(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}









getClientAdminData(): void {
  const apiUrl = `${environment.serverUrl}api/clientadmin`;
  
  // Get username from sessionStorage
  const userName = sessionStorage.getItem('UserName');
  
  if (userName) {
    // Append the username as a query parameter to the API URL
    const urlWithParams = `${apiUrl}?username=${userName}`;

    // Make the HTTP GET request with the username
    this.http.get<any>(urlWithParams).subscribe(
      (data) => {
        console.log('Data fetched:', data);
        if (data) {
          // Set form data
          this.formData.Username = data.Username || '';
          this.formData.email = data.email || '';
          
          // Handle image preview if available
          this.previewSrc = data.Picture || ''; // Display image preview
        }
        console.log("Data from clientadmin", data.Username, data.email,data.Picture);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to load clientadmin data';
      }
    );
  } else {
    console.error('No username found in sessionStorage');
    this.errorMessage = 'User not logged in';
  }
}


onFileSelected(event: any): void {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    this.formData.picture = file;

    // For preview, read the file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewSrc = e.target.result; // Update previewSrc with the file data URL
    };
    reader.readAsDataURL(file);
  }
}

onSubmit() {
  const formData = new FormData();
  formData.append('Username', this.formData.Username);
  formData.append('email', this.formData.email);
  formData.append('password', this.formData.password);

  // Append the picture file only if it's selected
  if (this.formData.picture) {
    formData.append('picture', this.formData.picture);  // Key 'picture' matches multer configuration
  }

  console.log('form data', formData);

  this.http.put(`${environment.serverUrl}api/update-client`, formData).subscribe(
    (response: any) => {
      console.log('Update successful:', response);
      alert('Data updated successfully'); // Show success alert
      this.closePopup1(); // Close the form or popup if it's open
    },
    (error) => {
      console.error('Update failed:', error);
      alert('Failed to update data'); // Show error alert
    }
  );
}








}