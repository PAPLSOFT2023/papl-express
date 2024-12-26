import { Component } from '@angular/core';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-software-admin-user-manage',
  templateUrl: './software-admin-user-manage.component.html',
  styleUrls: ['./software-admin-user-manage.component.scss']
})
export class SoftwareAdminUserManageComponent {
  constructor(private router:Router){}

  LoginDetails() {
   this.router.navigate(['/afterlogin/software_admin_dashboard_user_manage/organization_admin_login_details']);
  }

  updateUser() {
    
  }

  deleteUser() {
   
  }

  profileDetails() {
   

    this.router.navigate(['/afterlogin/software_admin_dashboard_user_manage/organization_admin_profile_details']);
    
  }
}


