import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departments: any[] = []; // Store department list
  department = { id: null, name: '', description: '' }; // Model for form
  searchQuery = { name: '', description: '' }; // Search filters
  apiUrl = 'http://localhost:9090/api/department';

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  // Fetch all departments
  getAllDepartments(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => (this.departments = data),
      error: (err) => console.error('Error fetching departments:', err)
    });
  }

  // Add or Update a department
  saveDepartment(): void {
    if (this.department.id) {
      this.http.put(`${this.apiUrl}/${this.department.id}`, this.department).subscribe({
        next: () => {
          this.getAllDepartments();
          this.clearForm();
        },
        error: (err) => console.error('Error updating department:', err)
      });
    } else {
      this.http.post(this.apiUrl, this.department).subscribe({
        next: () => {
          this.getAllDepartments();
          this.clearForm();
        },
        error: (err) => console.error('Error adding department:', err)
      });
    }
  }

  // Edit department (populate form)
  editDepartment(dept: any): void {
    this.department = { ...dept }; // Clone object to avoid direct mutation
  }

  // Delete department
  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.getAllDepartments(),
        error: (err) => console.error('Error deleting department:', err)
      });
      this.router.navigate(['admin/department']);
      
    }
  }

  // searchQuery = { name: '', description: '' }; // Duplicate declaration removed

  page: number = 0; // Starting at page 0
  size: number = 10; // Number of items per page
  totalPages: number = 0; // Total number of pages
  totalElements: number = 0; // Total number of departments



  searchDepartments(): void {
    const { name, description } = this.searchQuery;
    const queryParams = `?name=${name}&description=${description}&page=${this.page}&size=${this.size}`;
    
    this.http.get<any>(`${this.apiUrl}/search${queryParams}`).subscribe({
      next: (data) => {
        this.departments = data.content; // The 'content' field contains the list of departments
        this.totalPages = data.totalPages; // Assuming the response has a 'totalPages' field
        this.totalElements = data.totalElements; // Assuming the response has a 'totalElements' field (total count)
      },
      error: (err) => console.error('Error searching departments:', err)
    });
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.searchDepartments(); // Fetch new page of departments
    }
  }
  
  
  // Reset form
  clearForm(): void {
    this.department = { id: null, name: '', description: '' };
  }
}