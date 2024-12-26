import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-styled-alert-dialog',
  templateUrl: './styled-alert-dialog.component.html',
  styleUrls: ['./styled-alert-dialog.component.scss']
})
export class StyledAlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<StyledAlertDialogComponent>) {}

  // Function to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

 
}
