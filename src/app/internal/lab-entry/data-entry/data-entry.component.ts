import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface DiagnosticTest {
  id: number;
  name: string;
  code: string;
  price: number;
}

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) {
    const user = sessionStorage.getItem("auth-user");
    if (user) {
      this.userName = JSON.parse(user).user.userName; // Extract userName
    } else {
      this.userName = "Guest"; // Default value if no user is found
    }
    console.log("Retrieved userName:", this.userName);
      console.log(this.userName);
  }

  selectedBranch: string = '';
  testNameControl = new FormControl('');
  doctorNameControl = new FormControl('');

  tests: DiagnosticTest[] = [];
  filteredTests: DiagnosticTest[] = [];

  doctors: any[] = [];
  filteredDoctors: any[] = [];

  totalAmount: number = 0;
  discountPercent: number = 0;
  discountCash: number = 0;
  payableAmount: number = 0;
  paidAmount: number = 0;
  dueAmount: number = 0;

  reactform!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.fetchTests();
    this.fetchDoctors();
  }

  initializeForm() {
    this.reactform = this.fb.group({
      id: new FormControl(null),
      patientName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      createdBy: new FormControl(this.userName),
      totalAmount: new FormControl(0),
      discount: new FormControl(0),
      discount1: new FormControl(0),
      payableAmount: new FormControl(0),
      paidAmount: new FormControl(0),
      dueAmount: new FormControl(0),
      refBy: new FormControl(null),
      diagonesticTests: this.fb.array([])
    });
  }

  get diagonesticTests(): FormArray {
    return this.reactform.get('diagonesticTests') as FormArray;
  }

  fetchTests() {
    this.http.get<DiagnosticTest[]>('http://localhost:9090/api/diagnostic').subscribe(
      (data) => {
        this.tests = data || [];
      },
      (error) => {
        console.error('Error fetching tests:', error);
        alert('Failed to load test data.');
      }
    );
  }

  fetchDoctors() {
    this.http.get<any[]>('http://localhost:9090/api/doctor').subscribe(
      (data) => {
        this.doctors = data || [];
      },
      (error) => {
        console.error('Error fetching doctors:', error);
        alert('Failed to load doctor data.');
      }
    );
  }

  filterTests() {
    const input = this.testNameControl.value?.trim().toLowerCase() || '';
    this.filteredTests = input ? this.tests.filter(test => test.name.toLowerCase().includes(input)) : [];
  }

  selectTest(test: DiagnosticTest) {
    const alreadyAdded = this.diagonesticTests.controls.some(control => control.value.id === test.id);

    if (!alreadyAdded) {
      this.diagonesticTests.push(
        this.fb.group({
          id: test.id,
          name: test.name,
          price: test.price
        })
      );
      this.calculateAmounts();
    } else {
      alert('Test is already added.');
    }

    this.testNameControl.setValue('');
    this.filteredTests = [];
  }

  removeTest(index: number) {
    this.diagonesticTests.removeAt(index);
    this.calculateAmounts();
  }

  filterDoctors() {
    const input = this.doctorNameControl.value?.trim().toLowerCase() || '';
    this.filteredDoctors = input ? this.doctors.filter(doctor => doctor.name.toLowerCase().includes(input)) : [];
  }

  selectDoctor(doctor: any) {
    this.reactform.patchValue({ refBy: doctor.id });
    this.doctorNameControl.setValue(doctor.name);
    this.filteredDoctors = [];
  }

  calculateAmounts() {
    this.totalAmount = this.diagonesticTests.controls.reduce((sum, control) => sum + control.value.price, 0);

    const discountFromPercent = (this.totalAmount * this.reactform.value.discount) / 100;
    const totalDiscount = Math.min(discountFromPercent + this.reactform.value.discount1, this.totalAmount);

    this.payableAmount = this.totalAmount - totalDiscount;
    this.dueAmount = Math.max(this.payableAmount - this.reactform.value.paidAmount, 0);

    this.reactform.patchValue({
      totalAmount: this.totalAmount,
      payableAmount: this.payableAmount,
      dueAmount: this.dueAmount
    });
  }

  submitForm() {
    if (this.reactform.valid) {
      console.log('Form submitted:', this.reactform.value);

      this.http.post<any>('http://localhost:9090/api/MoneyReceipt', this.reactform.value)
        .subscribe(response => {
          if (response && response.id) {
            console.log('Form submitted successfully', response);
            // alert('Form submitted successfully!');

            // Download receipt first before resetting the form
            this.downloadReceipt(response.id);

            // Reset form after a short delay to ensure the download starts
            setTimeout(() => {
              this.reactform.reset();
              this.diagonesticTests.clear(); // Clear selected tests
            }, 1000); // 1-second delay
          } else {
            alert('Form submitted, but no receipt ID returned.');
          }
        }, error => {
          console.error('Error submitting form:', error);
          alert('Failed to submit form.');
        });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  downloadReceipt(id: number) {
    const format = 'pdf';
    this.http.get(`http://localhost:9090/receipt/download?format=${format}&id=${id}`, { responseType: 'blob' })
      .subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Open PDF in an iframe and trigger print
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <iframe src="${url}" style="width:100%;height:100%;" onload="this.contentWindow.print();"></iframe>
          `);
          printWindow.document.close();
        } else {
          alert('Popup blocked! Please allow popups for this site.');
        }

        // Optional: Revoke the object URL after some time
        setTimeout(() => window.URL.revokeObjectURL(url), 5000);
      }, error => {
        console.error('Error generating report:', error);
        alert('Failed to generate receipt.');
      });
  }




  userlist:any[]= [];
  userName: string = '';

  format: string = 'pdf';  // Default format (can be changed by user)
  id: any = '';   // Start date in ISO 8601 format
  toDate: string = ''; // End date (ISO 8601 format)
}
