import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approval-mail-insp',
  templateUrl: './approval-mail-insp.component.html',
  styleUrls: ['./approval-mail-insp.component.scss']
})
export class ApprovalMailInspComponent implements OnInit {
  isModalOpen: boolean = false;
  email: string = '';
  modalMode: 'add' | 'edit' = 'add';
  modalTitle: string = 'Add User';
  editingUserEmail: string | null = null;
  users: any[] = []; // Array to store users

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers(); // Fetch users when the component initializes
  }

  // Fetch users from the backend API
  getUsers(): void {
    this.http.get(`${environment.serverUrl}api/users`).subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        alert('Error fetching users.');
        console.error(error);
      }
    );
  }

  // Open modal for add/edit user
  openPopup(mode: 'add' | 'edit', email?: string): void {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.modalTitle = mode === 'add' ? 'Add User' : 'Update User';

    if (mode === 'edit') {
      this.editingUserEmail = email || null;
      this.email = this.editingUserEmail || '';
    } else {
      this.email = '';
    }
  }

  // Close the modal
  closePopup(): void {
    this.isModalOpen = false;
    this.email = '';
    this.editingUserEmail = null;
  }

  addUser(): void {
    if (this.email) {
      const user = { email: this.email };
      this.http.post(`${environment.serverUrl}api/add_mail_insp`, user).subscribe(
        response => {
          alert(`User with email ${this.email} has been added.`);
          this.getUsers(); // Refresh the users list
          this.closePopup();
        },
        error => {
          alert('There was an error adding the user.');
          console.error('Error adding user:', error); // Log the error to the console for debugging
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
  }
  
  updateUser(): void {
    if (this.email && this.editingUserEmail) {
      const user = { email: this.email, originalEmail: this.editingUserEmail };
  
      this.http.put(`${environment.serverUrl}api/update_mail_insp`, user).subscribe(
        response => {
          alert(`User email has been updated to ${this.email}.`);
          this.getUsers(); // Refresh the users list
          this.closePopup(); // Close the popup
        },
        error => {
          alert('There was an error updating the user email.');
          console.error('Error updating email:', error); // Log error for debugging
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
  }
  

  deleteUser(userId: number): void {
    this.http.delete(`${environment.serverUrl}api/delete_mail_insp/${userId}`).subscribe(
      response => {
        alert('User deleted successfully.');
        this.getUsers(); // Refresh the users list
      },
      error => {
        alert('There was an error deleting the user.');
      }
    );
  }
  
}


