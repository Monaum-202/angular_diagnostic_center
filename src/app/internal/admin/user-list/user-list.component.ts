import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: any[] = [];  // Array to hold all users data
  pagedUserList: any[] = [];  // Array to hold current page data
  totalPages: number = 0; // Total number of pages
  currentPage: number = 0; // Current page index
  pageSize: number = 10; // Number of users per page

  constructor(private userServiceService: UserServiceService) { }

  ngOnInit(): void {
    this.fetchUserData(); // Fetch user data when the component is initialized
  }

  // Fetch all users from the backend
  fetchUserData(): void {
    this.userServiceService.getAllData().subscribe({
      next: (response: any) => {
        this.userList = response; // Store all users in userList
        this.totalPages = Math.ceil(this.userList.length / this.pageSize); // Calculate total pages
        this.updatePagedList(); // Update the paged list for the first page
      },
      error: (error) => {
        console.error("Error fetching user data:", error);
      }
    });
  }

  // Update the pagedUserList based on the current page
  updatePagedList(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUserList = this.userList.slice(startIndex, endIndex); // Get the users for the current page
  }

  // Delete a user
  deleteUser(userName: string): void {
    this.userServiceService.deleteById(userName).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.fetchUserData();  // Refresh the user data after deletion
      },
      error: (error) => {
        console.error("Error deleting user:", error);
      }
    });
  }

  // Pagination logic: Change to the specified page
  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.updatePagedList();  // Update the paged data for the new page
  }
}
