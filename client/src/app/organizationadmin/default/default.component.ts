import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent  {

  constructor(private router: Router) {} // Inject Router

  // Example redirection method
  redirect1() {
    this.router.navigate(['afterlogin', 'client_default_cc']);
  }

  redirect2() {
    this.router.navigate(['afterlogin', 'approval_mail_insp']);
  }
  redirect3() {
    this.router.navigate(['afterlogin', 'approved_schedule_mail']);
  }
 
  

  
  }
