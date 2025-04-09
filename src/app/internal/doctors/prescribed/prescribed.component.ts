import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface PrescriptionDTO {
  id: number;
  name: string;
  phone: string;
  age: number;
  sex: string;
  advice: string;
  followup: string;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Component({
  selector: 'app-prescribed',
  templateUrl: './prescribed.component.html',
  styleUrls: ['./prescribed.component.scss']
})
export class PrescribedComponent implements OnInit {
  patientList: PrescriptionDTO[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  format: string = 'pdf';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): void {
    const url = `https://b5a5-103-4-117-150.ngrok-free.app/api/prescriptions?page=${page}&size=${size}&sort=${sort}`;

    this.http.get<PaginatedResponse<PrescriptionDTO>>(url).subscribe({
      next: (data) => {
        if (data && data.content) {
          this.patientList = data.content.sort((a, b) => b.id - a.id);
        } else {
          console.error('No prescriptions data received.');
        }

        // Handle pagination metadata
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      },
      error: (err) => {
        console.error('Error fetching prescriptions:', err);
      }
    });
  }

  // Change page handler
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchPrescriptions(page);
    }
  }
}
