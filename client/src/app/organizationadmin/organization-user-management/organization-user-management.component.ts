
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-organization-user-management',
  templateUrl: './organization-user-management.component.html',
  styleUrls: ['./organization-user-management.component.scss']
})
export class OrganizationUserManagementComponent {
  users: { id: number, Email: string, Username: string,Confirm_password:string,Password:string, Organization: string, Status: string,Emailverified:string,Role:string,Department:string }[] = [];
    user: {id: number, Email: string, Username: string,Confirm_password:string,Password:string,  Organization:string, Status: string,Emailverified:string,Role:string,Department:string } = { id: 0, Email: '', Username: '',Confirm_password:'',Password:'',Organization:'',Status:'',Emailverified:'',Role:'',Department:'' };
   

    searchText: string = ''; // Search text
    filteredUsers: { id: number, Email: string, Username: string, Confirm_password: string, Password: string, Organization: string, Status: string, Emailverified: string, Role: string, Department: string }[] = []; // Filtered users
  
  

    selectedRole:string=''
    selectedDept:string=''

    departments: string[] = [];
  roles: string[] = [];
  organizations: string[] = [];


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

  
    // Load the data and populate the users
    LoadDataFromDB() {
      this.apiservice.getLoginData().subscribe((response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.user = response[i];
          
          // Handle user status
          this.user.Status = response[i].Status === 1 ? 'ACTIVE' : 'INACTIVE';
          this.user.Emailverified = response[i].Emailverified == 1 ? 'VERIFIED' : 'NOT VERIFIED';
  
          if (this.user.Role !== "Softwareadmin" && this.user.Role !== "Organization Admin" && sessionStorage.getItem('Organization') === this.user.Organization) {
            this.user.id = i;
            this.users.push(this.user);
          }
        }
        this.filteredUsers = [...this.users]; // Initially display all users
      }, (error: any) => {
        console.log(error);
      });
    }

     // Filter users based on the search text
  filterUsers() {
    const query = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      return user.Email.toLowerCase().includes(query) ||
        user.Username.toLowerCase().includes(query) ||
        user.Department.toLowerCase().includes(query) ||
        user.Role.toLowerCase().includes(query) ||
        user.Status.toLowerCase().includes(query);
    });
  }




  openUserPopup() {

this.resetUser();

    this.isUserPopupOpen = true;
    this.getRolebasedData();
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


  getRolebasedData() {
    this.apiservice.getRoleDepartmentData(sessionStorage.getItem('Organization') as string).subscribe(
      (response: any) => {
        if (response) {
          // Assuming response has properties Department, Role, and Organization
          this.departments = Array.from(new Set(response.Department));
          this.roles = Array.from(new Set(response.Role));
          this.organizations = Array.from(new Set(response.Organization));
  
          console.log("Departments:", this.departments);
          console.log("Roles:", this.roles);
          console.log("Organizations:", this.organizations);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  


  addUser() {


    

      // console.log("UUUUUU",this.user.Role+this.user.Department)
    
     this.user.Organization= sessionStorage.getItem('Organization') as string;
    if(this.user.Email && this.user.Password && this.user.Organization && this.user.Department && this.user.Status && this.user.Role && this.user.Username)
      { 
        
        
        if(this.user.Password == this.user.Confirm_password){
      if (this.user.Status.toLowerCase() === "active") {
        this.statusnumber = 1;
      }
      else{
        this.statusnumber = 0;
      }
      this.apiservice.adminregister(this.user.Email,this.user.Password,this.user.Organization,this.user.Role,this.statusnumber,"Organization Admin",this.user.Username,0,this.user.Department).subscribe((response)=>{

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
    this.getRolebasedData();

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
  
      if (this.user.Email && this.user.Organization && this.user.Status && this.user.Username && this.existingmail && this.user.Department  && this.user.Role) {
        this.apiservice.updateLoginData(
          this.user.Email,
          this.user.Organization,
          this.user.Role,
          this.statusnumber,
          "Softwareadmin",
          this.user.Username,
          this.emailverifidenumber,
          this.existingmail,
          this.user.Department
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
