
import { Component, ElementRef, ViewChild,Renderer2,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-ui-elements',
  templateUrl: './ui-elements.component.html',
  styleUrls: ['./ui-elements.component.scss']
})
export class UiElementsComponent  {

  constructor(private router: Router) {} // Inject the Router service
   // Method to redirect to the OEM details route
   redirect1(): void {
    this.router.navigate(['afterlogin','oem_details']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect2(): void {
    this.router.navigate(['afterlogin','inspection-time']); // Replace 'your-target-route' with the actual route path you want to redirect to
  }
  redirect3(): void {
    this.router.navigate(['afterlogin','inspector-type']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect4(): void {
    this.router.navigate(['afterlogin','travel-accomodation']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect5(): void {
    this.router.navigate(['afterlogin','inspection-time-shift']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect6(): void {
    this.router.navigate(['afterlogin','inspection-type']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect7(): void {
    this.router.navigate(['afterlogin','type-of-building']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect8(): void {
    this.router.navigate(['afterlogin','region-details']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
  redirect9(): void {
    this.router.navigate(['afterlogin','vendor-details']); // Replace 'your-target-route' with the actual route path you want to redirect to

  }
 
}
    
  
      
    