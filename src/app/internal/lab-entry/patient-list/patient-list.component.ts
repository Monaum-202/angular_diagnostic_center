import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interface for patient record
export interface DiagnosticMoneyReceipt {
  id: number;
  patientName: string;
  mobile: string;
  age: number;
  sex: string;
  createdAt: string; // Use string or Date depending on backend
  payableAmount: number;
  discount: number;
  paidAmount: number;

  // Calculated values
  netPayableAmount?: number;
  dueAmount?: number;
}

// Interface for paginated API response
interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients: DiagnosticMoneyReceipt[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  private subscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPatient(); // Initial load
  }

  // Fetch paginated patients
  fetchPatient(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): void {
    const url = `http://localhost:9090/api/MoneyReceipt?page=${page}&size=${size}&sort=${sort}`;

    this.subscription = this.http.get<PaginatedResponse<DiagnosticMoneyReceipt>>(url).subscribe({
      next: (data) => {
        if (data && data.content) {
          // Calculate extra fields
          this.patients = data.content.map(p => ({
            ...p,
            netPayableAmount: p.payableAmount - p.discount,
            dueAmount: p.payableAmount - p.discount - p.paidAmount
          })).sort((a, b) => b.id - a.id);
        } else {
          this.patients = [];
          console.error('No patient data received.');
        }

        // Handle pagination metadata
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      }
    });
  }

  // Page change handler
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchPatient(page);
    }
  }

  // Optional: Delete a patient (not wired to UI in your shared HTML)
  deletePatient(id: number): void {
    const url = `http://localhost:9090/api/MoneyReceipt/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Patient deleted successfully');
        this.fetchPatient(this.currentPage); // Refresh current page
      },
      error: (err) => {
        console.error('Error deleting patient:', err);
      }
    });
  }

  // Unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
