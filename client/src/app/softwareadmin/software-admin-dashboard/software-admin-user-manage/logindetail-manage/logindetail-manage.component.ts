import { Component } from '@angular/core';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
@Component({
  selector: 'app-logindetail-manage',
  templateUrl: './logindetail-manage.component.html',
  styleUrls: ['./logindetail-manage.component.scss']
})
export class LogindetailManageComponent {
  users: { id: number, Email: string, Username: string,Confirm_password:string,Password:string, Organization: string, Status: string,Emailverified:string,Role:string,Department:string }[] = [];
    user: {id: number, Email: string, Username: string,Confirm_password:string,Password:string,  Organization:string, Status: string,Emailverified:string,Role:string,Department:string } = { id: 0, Email: '', Username: '',Confirm_password:'',Password:'',Organization:'',Status:'',Emailverified:'',Role:'',Department:'' };
   
   

    selectedRole:string=''
    selectedDept:string=''
  organizationRoles!: any[];
  editMode: boolean = false;
  isUserPopupOpen: boolean = false;
  isUserPopupOpen1: boolean = false;
  existingmail:string="";
  statusnumber:number=0;
  emailverifidenumber:number=0;
constructor(private apiservice:ApicallService)
{

}
onDropdownChangeRole(event:any){
  this.user.Role=event.target.value;
}

onDropdownChangeDepart(event: any) {
        this.user.Department = event.target.value;
      }
  
    
  ngOnInit(){
    this. LoadDataFromDB();

  }

  onStatusChange(newStatus: string) {
    this.user.Status = newStatus.toUpperCase();
  }

  
  LoadDataFromDB()
  {   

    this.apiservice.getLoginData().subscribe((response:any)=>{
    // console.log("++++",response);
    for(let i=0;i<response.length;i++){
      // console.log(response[i])
     
      this.user=response[i];
      if (response[i].Status === 1) {
        
        // Set this.user.Status to 'active'
        this.user.Status = 'ACTIVE';
    
        // If you want to break out of the loop after the first match, you can use 'break'
    
      }
      else{
        this.user.Status = 'INACTIVE';
      }

      if(response[i].Emailverified==1 )
      {
        this.user.Emailverified="VERIFIED";
        this.emailverifidenumber=1;

      }
      else{
        this.user.Emailverified="NOT VERIFIED";
      }

      if(this.user.Role!=="Softwareadmin" && this.user.Role =="Organization Admin"){
      this.user.id=i;
      this.users.push(this.user)
      }   
      
       
    
    }

    },
   (error:any)=>{
    console.log(error);
  
   })

  }




  openUserPopup() {

this.resetUser();

    this.isUserPopupOpen = true;
   
  }

    
  openUserPopup1() {
    this.isUserPopupOpen1 = true;
  }

  closeUserPopup() {
    this.isUserPopupOpen = false;
    this.isUserPopupOpen1 = false;
    this.resetUser();
  }
  // userid:string, password:string, organization:string, role:String,status:number,authenticator:string,name:string,statusnum:number

  addUser() {

    

      console.log("UUUUUU",this.user.Role+this.user.Department)
    

    if(this.user.Email && this.user.Password && this.user.Organization  && this.user.Status  && this.user.Username)
      { 
        
        
        if(this.user.Password == this.user.Confirm_password){
      if (this.user.Status.toLowerCase() === "active") {
        this.statusnumber = 1;
      }
      else{
        this.statusnumber = 0;
      }
      this.apiservice.adminregister(this.user.Email,this.user.Password,this.user.Organization,"Organization Admin",this.statusnumber,"Organization Admin",this.user.Username,0,"Administrative").subscribe((response)=>{

      if(response)
      {
        alert("Register successful")
        this.user.id = this.generateUserId();
        this.users.push({ ...this.user });
        this.resetUser();
        this.closeUserPopup();
        

      }
    },
    
    (error: any) => {
      
      if (error.error && error.error.message) {
       alert( error.error.message);
      }
       else {
        // If the error response doesn't have the expected structure, handle it accordingly
        alert( 'An error occurred.');
      }
    });
  
 
    }
    else{
      alert("Password and Confirm Password Miss Match");
    }

    
  }
  else{
    alert("Please Enter All Values")
  }
  }

  editUser(id: number) {

    this.editMode = true;
  

    const userToEdit = this.users.find(user => user.id === id);
    console.log("edite user dat",userToEdit)
    if (userToEdit) {
      this.user = { ...userToEdit }; 
      this.existingmail=this.user.Email;
      this.openUserPopup1();
    }
  }

  updateUser() {
    const isConfirmed = window.confirm("Are you sure you want to update?");
    
    if (isConfirmed) {
      if (this.user.Status.toLowerCase() === "active") {
        this.statusnumber = 1;
      }
  
      if (this.user.Email && this.user.Organization && this.user.Status && this.user.Username && this.existingmail) {
        this.apiservice.updateLoginData(
          this.user.Email,
          this.user.Organization,
          "Organization Admin",
          this.statusnumber,
          "Softwareadmin",
          this.user.Username,
          this.emailverifidenumber,
          this.existingmail,
          "Administrative"
        ).subscribe(
          (response: any) => {

            
            console.log(response.message);
            const index = this.users.findIndex((user) => user.id === this.user.id);
            if (index !== -1) {
              this.users[index] = { ...this.user };
              this.resetUser();
              this.editMode = false;
              this.closeUserPopup();
            }
          },
          (error: any) => {
            console.log("update failed");
          }
        );
      } 
      else {
        alert("Please Enter All Values.");
      }
    }
  }
  

  deleteUser(id: number,email:string) {
    
    const isConfirmed = window.prompt("Are you Sure to Delete " + email + "?", "Enter email here");

    if(isConfirmed!=null){
    if (isConfirmed===email) {



      this.apiservice.deleteLoginDetails(email).subscribe((response:any)=>{

      alert(response)
      this.users.filter(user => user.id == id);

      },
      (error:any)=>{

        // alert(error);
        console.log(error)
      }
      );


      this.users = this.users.filter(user => user.id !== id);
    }
    else{
      alert("Mail not Match");
    }
  }


    
  }

  resetUser() {
    this.user = { id: 0, Email: '', Username: '',Confirm_password:'',Password:'',Organization:'',Status:'',Emailverified:'',Role:'',Department:'' };
  }

  private generateUserId(): number {
    const existingIds = this.users.map(user => user.id);
   
    return Math.max(0, ...existingIds) + 1;
  }
}
