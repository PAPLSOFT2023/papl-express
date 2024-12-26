
import { Component, OnInit, OnDestroy,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('countAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('fullscreenContainer') fullscreenContainer!: ElementRef;
  isLoading: boolean = false;
  name: string | null = sessionStorage.getItem('UserName');
  dropdownVisible = false;
  showPopup = false;
  clientAdminData: any[] = [];
  errorMessage: string = '';
  animatedCount: number = 0;
  totalUnitsCount: number = 0;
  targetCount: number = 0;
  status1Count: number = 0;
  status0Count: number = 0;
  interval: any;
  isVisible: boolean = false;
  isPasswordVisible: boolean = false;
  previewSrc: string | ArrayBuffer | null = null;


  unitDetails: any[] = [];
  RejectedCount:any[]=[];
  certificatecount:any[]=[];
  empcount:any[]=[];
  approvalcount:any[]=[];
  approvalreportcount:any[]=[];
  nonapprovalreportcount:any[]=[];
  feedbackcount:any[]=[];
  speccount:any[]=[];

  logincount:any[]=[];
  activestatus1Count: number = 0;

  
  totalUnitsInspectedCount: number = 0;
  
  
  
  formData = {
    Username: '',
    email: '',
    password:'',
    picture: null as File | null  // Allow 'picture' to be either File or null
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTotalCount();
    this.getTotalUnitsCount();
    this.getInfCounts();
    this.getClientAdminData();
    window.addEventListener('click', this.closeDropdown.bind(this));
    this.fetchUnitsDetails();
    this.fetchRejectedCount();
    this.fetchcertificateCount();
    this.getClientAdminData();
    this.fetchapprovalCount();
    this.fetchempCount();
    this.fetchloginCount();
    this.getactiveInfCounts();
    this.fetchapprovalreportCount();
    this.fetchnonapprovalreportCount();
    this.fetchfeedbackCount();
    this. fetchspecCount();
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeDropdown.bind(this));
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownVisible = false;
    }
  }

  fetchTotalCount() {
    this.http.get<any>(`${environment.serverUrl}api/get-total-count`).subscribe(
      (data) => {
        this.targetCount = data.count;
        this.startCountAnimation(this.targetCount, (count) => this.animatedCount = count);
      },
      (error) => {
        console.error('Error fetching total count:', error);
      }
    );
  }

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

  getInfCounts(): void {
    this.http.get<{ status1Count: number, status0Count: number }>(`${environment.serverUrl}api/get-inf-counts`).subscribe(
      (data) => {
        this.startCountAnimation(data.status1Count, (count) => this.status1Count = count);
        this.startCountAnimation(data.status0Count, (count) => this.status0Count = count);
      },
      (error) => {
        console.error('Error fetching INF counts:', error);
      }
    );
  }









// ----------------------------------------------------------



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


fetchspecCount() {
  this.http.get<any>(`${environment.serverUrl}api/get-spec-count`).subscribe(
    data => {
      console.log('Fetched data:', data);

      if (data && data.count !== undefined) {
        this.speccount = data.count; // Store the count value
        console.log('Total unit_no count:', this.speccount); // Log the count for inspection
      } else {
        console.error('Expected a "count" property, but received:', data);
      }
    },
    error => {
      console.error('Error fetching unit_no count:', error);
    }
  );
}




fetchfeedbackCount() {  
this.http.get<any>(`${environment.serverUrl}api/get-feedback-count`).subscribe(
  data => {
    console.log('Fetched data:', data);
    this.feedbackcount = data.count; // Assign the count value directly
    console.log('Feedback count:', this.feedbackcount); // Log the count
  },
  error => {
    console.error('Error fetching feedback count:', error);
  }
);
}



// Fetch counts of i_status = 1 within the current month
getactiveInfCounts(): void {
this.http.get<{ activestatus1Count: number }>(`${environment.serverUrl}api/get-inf-active-counts`).subscribe(
  (data) => {
    this.activestatus1Count = data.activestatus1Count;
    console.log('Status 1 Count (this month):', this.activestatus1Count);  // Log the count
  },
  (error) => {
    console.error('Error fetching INF counts:', error);
  }
);
}










fetchapprovalCount() {  
  this.http.get<any>(`${environment.serverUrl}api/get-approval-count`).subscribe(
    data => {
      console.log('Fetched data:', data);
      this.approvalcount = data.count; // Get the count value
      console.log('Certificate count:', this.approvalcount); // Log the count
    },
    error => {
      console.error('Error fetching certificate details:', error);
    }
  );
}



fetchapprovalreportCount() {  
  this.http.get<any>(`${environment.serverUrl}api/get-approval-report-count`).subscribe(
    data => {
      console.log('Fetched data:', data);
      this.approvalreportcount = data.count; // Get the count value
      console.log('Certificate count:', this.approvalcount); // Log the count
    },
    error => {
      console.error('Error fetching certificate details:', error);
    }
  );
}


fetchnonapprovalreportCount() {  
  this.http.get<any>(`${environment.serverUrl}api/get-nonapproval-report-count`).subscribe(
    data => {
      console.log('Fetched data:', data);
      this.nonapprovalreportcount = data.count; // Get the count value
      console.log('Certificate count:', this.approvalcount); // Log the count
    },
    error => {
      console.error('Error fetching certificate details:', error);
    }
  );
}





fetchempCount() {  
  this.http.get<any>(`${environment.serverUrl}api/get-emp-count`).subscribe(
    data => {
      console.log('Fetched data:', data);
      this.empcount = data;
      console.log('certificate count:', this.empcount.length); // Log the count
    },
    error => {
      console.error('Error fetching certificate details:', error);
    }
  );
}




fetchloginCount() {  
  this.http.get<any>(`${environment.serverUrl}api/get-login-count`).subscribe(
    data => {
      console.log('Fetched data:', data);
      this.logincount = data;
      console.log('certificate count:', this.logincount.length); // Log the count
    },
    error => {
      console.error('Error fetching certificate details:', error);
    }
  );
}


























  startCountAnimation(target: number, update: (count: number) => void) {
    let currentCount = 0;
    const maxCount = target;
    const speed = 50;

    this.interval = setInterval(() => {
      currentCount += Math.ceil(maxCount / 100);
      if (currentCount >= maxCount) {
        clearInterval(this.interval);
        currentCount = maxCount;
      }
      update(currentCount);
    }, speed);
  }




  openLogoutPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

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


// Method to fetch data from the API and bind to the form
// Method to fetch data from the API and bind to the form
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

enterFullscreen() {
  const element = this.fullscreenContainer.nativeElement;

  if (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) { // Safari
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // Firefox
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) { // IE/Edge
      (element as any).msRequestFullscreen();
    }

    element.classList.add('fullscreen'); // Add fullscreen class
  }
}

exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) { // Safari
    (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) { // Firefox
    (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) { // IE/Edge
    (document as any).msExitFullscreen();
  }

  const element = this.fullscreenContainer.nativeElement;
  element.classList.remove('fullscreen'); // Remove fullscreen class
}

 // Call this function when starting an action (e.g., loading data)
 startLoading() {
  this.isLoading = true;
}

// Call this function to stop the loader after an action is completed
stopLoading() {
  this.isLoading = false;
}






redirect() {
  this.router.navigate(['afterlogin', 'approval']);
}

redirect1() {
  this.router.navigate(['afterlogin', 'app-organization-user-management']);
}

redirect2() {
  this.router.navigate(['afterlogin', 'organization_adminUI']);
}
redirect3() {
  this.router.navigate(['afterlogin', 'profile-manage']);
}
redirect4() {
  this.router.navigate(['afterlogin', 'msf-24']);
}
redirect5() {
  this.router.navigate(['afterlogin', 'manage_data']);
}
redirect6() {
  this.router.navigate(['afterlogin', 'inspector-cv']);
}
redirect7() {
  this.router.navigate(['afterlogin', 'inspector_sign']);
}
redirect8() {
  this.router.navigate(['afterlogin', 'default_cc']);
}
redirect9() {
  this.router.navigate(['afterlogin', 'schedule_status']);
}
redirect10() {
  this.router.navigate(['afterlogin', 'scheduled_inf']);
}
redirect11() {
  this.router.navigate(['afterlogin', 'inspection_analysis']);
}
redirect12() {
  this.router.navigate(['afterlogin', 'certificate_analysis']);
}
redirect13() {
  this.router.navigate(['afterlogin', 'default_cc']);
}
redirect14() {
  this.router.navigate(['afterlogin', 'spec-pdf']);
}
// redirect15() {
//   this.router.navigate(['afterlogin', 'spec-crud']);
// }
redirect16() {
  this.router.navigate(['afterlogin', 'approval-report']);
}
redirect17() {
  this.router.navigate(['afterlogin', 'not-approve-report']);
}
redirect18() {
  this.router.navigate(['afterlogin', 'feedback-pdf']);
}

redirect19() {
  this.router.navigate(['afterlogin', 'response']);
}


redirect20() {
  this.router.navigate(['afterlogin', 'report_images']);
}











}



  
