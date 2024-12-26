import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-manage-data',
  templateUrl: './project-manage-data.component.html',
  styleUrls: ['./project-manage-data.component.scss']
})
export class ProjectManageDataComponent {
  constructor(private router: Router) {} // Inject Router

  // Example redirection method
  redirect1() {
    this.router.navigate(['afterlogin', 'organization_adminUI']);
  }

  redirect2() {
    this.router.navigate(['afterlogin', 'inspection_master']);
  }
  redirect3() {
    this.router.navigate(['afterlogin', 'spec-crud']);
  }
  redirect4() {
    this.router.navigate(['afterlogin', 'organization_department']);
  }
  redirect5() {
    this.router.navigate(['afterlogin', 'organization_role']);
  }
  

}