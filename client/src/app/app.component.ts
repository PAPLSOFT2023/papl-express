
import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataItems: string[] = ['Option 1', 'Option 2', 'Option 3'];
  newData: string = ''; // Initialize an empty string to hold the new data
  title = 'sidenav-with-multilevel-menu';

  isSideNavCollapsed = false;
  screenWidth = 0;

  

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

    addToDropdown() {
      if (this.newData.trim() !== '') { // Check if the input is not empty
        this.dataItems.push(this.newData); // Add the new data to the array
        this.newData = ''; // Clear the input field
      }
  }

}