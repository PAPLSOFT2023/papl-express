import { Component, OnInit, OnDestroy,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('countAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit, OnDestroy {
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
  
  
  
  formData = {
    Username: '',
    email: '',
    password:'',
    picture: null as File | null  // Allow 'picture' to be either File or null
  };
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.fetchTotalCount();
    this.getTotalUnitsCount();
    this.getInfCounts();
    this.getClientAdminData();
    window.addEventListener('click', this.closeDropdown.bind(this));
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
    // Make the GET request to the API endpoint
    this.http.get<{ status1Count: number, status0Count: number }>(`${environment.serverUrl}api/get-inf-counts`).subscribe(
      (data) => {
        // Assign the fetched data to component properties
        this.status1Count = data.status1Count;
        this.status0Count = data.status0Count;
        console.log('INF Counts:', data);
      },
      (error) => {
        console.error('Error fetching INF counts:', error);
        this.errorMessage = 'Failed to load INF counts';
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

  redirect() {
    this.router.navigate(['afterlogin', 'sales_list']);
  }

  redirect1() {
    this.router.navigate(['afterlogin', 'inf_history']);
  }

  redirect2() {
    this.router.navigate(['afterlogin', 'home_page']);
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


}
