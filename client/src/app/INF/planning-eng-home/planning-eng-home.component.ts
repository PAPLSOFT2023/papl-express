import { Component } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-planning-eng-home',
  templateUrl: './planning-eng-home.component.html',
  styleUrls: ['./planning-eng-home.component.css']
})
export class PlanningEngHomeComponent {
  public contract_nos: string[] = [];
  constructor(private dataService:ApicallService,private router:Router){

  }

  handleClick(c_no: string) {
    // Handle the click event here
    const encodedValue = encodeURIComponent(c_no);
    console.log("clicked++",encodedValue)
    // this.router.navigate(['/plan_eng_inf', encodedValue]);
    this.router.navigate(['/afterlogin/plan_eng_inf',encodedValue])
  }

  ngOnInit(){
    this.dataService.getContractNo1().subscribe((data: string[]) => {
      this.contract_nos = data;
    });
  }



}
