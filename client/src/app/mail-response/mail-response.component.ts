import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../apicall.service';
@Component({
  selector: 'app-mail-response',
  templateUrl: './mail-response.component.html',
  styleUrls: ['./mail-response.component.scss']
})
export class MailResponseComponent {
  id: string='';
  Isapproved:boolean=false;
  show_already:boolean=false;

  rejectionCauses: any[] = [];
  selectedCause: string = '';

  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) {}

  ngOnInit(): void {
    // Read the 'id' parameter from the URL
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.apicallservice.Check_Client_response(this.id).subscribe((check:any)=>{

      if(check[0].client_approval_status=="1" || ((check[0].client_rejection_reason.length >2 )) )
      {



        this.Isapproved=true 
        this.show_already=true
        
        
      }
     },(error:any)=>{
  
     });

  }
  showRejectionPopup = false;


  showPopup() {
   this.apicallservice.Cilent_approval(this.id).subscribe((approval:any)=>{

    if(approval=="Approved")
    {
      this.Isapproved=true   
      alert("Schedule Accepted . ")  
    }
   },(error:any)=>{

   });
  
  }

  showRejection() {


    this.apicallservice.get_Rejection_schedule().subscribe((response:any)=>{
      if (response && response.length > 0) {
        this.rejectionCauses = response;
        this.selectedCause = this.rejectionCauses[0].cause; // Set the default selected cause
      }

    },(problem:any)=>{

    })
    this.showRejectionPopup = true;
  }

  closeRejection() {
    this.showRejectionPopup = false;
  }

  submitRejection() {
    // Add logic to submit rejection
   



if(this.selectedCause !=null && this.selectedCause !=='')

      this.apicallservice.submitRejection(this.selectedCause,this.id).subscribe((approval:any)=>{

        if(approval=="Added")
        {
          this.Isapproved=true   
          alert("Response Sended. ")  
        }
       },(error:any)=>{
    
       });
      this.closeRejection();
      }
    
  }
