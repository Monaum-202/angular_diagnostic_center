import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PrescriptionService } from 'src/app/service/prescription/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup;
  medicines: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,
    private prescriptionService: PrescriptionService
  ) {
    this.prescriptionForm = this.fb.group({
      prescriptions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.fetchMedicines();
    this.addRow(); // Initialize with one row
  }

  get prescriptions(): FormArray {
    return this.prescriptionForm.get('prescriptions') as FormArray;
  }

  fetchMedicines() {
    this.http.get<any[]>('http://localhost:9090/api/medicines').subscribe(data => {
      this.medicines = data;
    });
  }

  addRow() {
    this.prescriptions.push(this.fb.group({
      medicineName: [''],
      dose: [''],
      frequency: ['']
    }));
  }

  removeRow(index: number) {
    this.prescriptions.removeAt(index);
  }

  submitPrescription() {
    console.log(this.prescriptionForm.value);
    this.http.post('http://localhost:9090/api/prescriptions', this.prescriptionForm.value)
      .subscribe(response => console.log('Prescription saved', response));
  }

    id!: any;
    prescriptionList!: any;


    prescriptionsForm: FormGroup = new FormGroup({
      patientName: new FormControl(),
      age: new FormControl(),
      gender: new FormControl(),
      medicationName: new FormControl(),
      frequency: new FormControl(),
      dose: new FormControl(),
      investigation: new FormControl(),
      diagnosis: new FormControl(),
      message: new FormControl(),
    })

    onSubmit() {
      console.log(this.prescriptionsForm.value);

      this.http.post('http://localhost:9090/api/prescriptions', this.prescriptionForm.value)
      .subscribe(response => console.log('Prescription saved', response));
    }
}
