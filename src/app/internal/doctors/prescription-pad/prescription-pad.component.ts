import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from 'src/app/service/prescription/prescription.service';

@Component({
  selector: 'app-prescription-pad',
  templateUrl: './prescription-pad.component.html',
  styleUrls: ['./prescription-pad.component.scss'],
})
export class PrescriptionPadComponent implements OnInit {
  constructor(
    private prescriptionService: PrescriptionService,
    private http: HttpClient,
    private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  prescriptionForm!: FormGroup;

  medicinesArray!: FormArray;
  allMedicines: any[] = []; // Store all medicines from API
  filteredMedicines: any[][] = [];

  investigationsArray!: FormArray;
  allInvestigations: any[] = []; // Store all investigations from API
  filteredInvestigations: any[][] = []; // Store filtered investigations for each row

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      medicines: this.fb.array([]),
      investigations: this.fb.array([]),
    });
    this.medicinesArray = this.prescriptionForm.get('medicines') as FormArray;
    this.investigationsArray = this.prescriptionForm.get(
      'investigations'
    ) as FormArray;

    // Fetch medicine names from API on component load
    this.http
      .get<any[]>('https://b5a5-103-4-117-150.ngrok-free.app/api/medicines')
      .subscribe((data) => {
        this.allMedicines = data;
      });

    this.http
      .get<any[]>('https://b5a5-103-4-117-150.ngrok-free.app/api/diagnostic')
      .subscribe((data) => {
        this.allInvestigations = data;
      });

    this.Addnewrow();
    this.Addnewrow1();
    this.Addnewrow2();
    this.Addnewrow3();
  }

  filterMedicines(index: number) {
    const input = this.medicines.at(index).get('medicine')?.value.toLowerCase();

    if (!input) {
      this.filteredMedicines[index] = this.filteredMedicines[index] =
        this.allMedicines.filter((med) =>
          med.medicineName.toLowerCase().includes(input)
        );
      return;
    }
    this.filteredMedicines[index] = this.allMedicines;
  }

  filterInvestigations(index: number) {
    const input = this.investigations.at(index).get('investigation')?.value.toLowerCase();


     if (!input) {
      this.filteredInvestigations[index] = this.filteredInvestigations[index] =
     this.allInvestigations.filter((inv) =>
      inv.name.toLowerCase().includes(input)
     );
   return;
 }
 this.filteredInvestigations[index] = this.allInvestigations;
  }


  title = 'FormArray';
  items!: FormArray;
  reactform = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    medicines: new FormArray([]),
    investigations: new FormArray([]),
    diagnosis: new FormArray([]),
    complaints: new FormArray([]),
    advice: new FormControl(''),
    followup: new FormControl(''),
  });

  Addnewrow() {
    const newMedicineRow = this.fb.group({
      medicine: '',
      dosage: '',
      frequency: '',
      duration: '',
    });

    this.medicines.push(newMedicineRow);
    this.filteredMedicines.push([]); // Initialize an empty array for filtered medicines
  }

  Removeitem(index: number) {
    this.medicines.removeAt(index);
    this.filteredMedicines.splice(index, 1); // Remove the corresponding filtered medicines array
  }

  Addnewrow1() {
    const newInvestigationRow = this.fb.group({
      investigation: ''
    });

    this.investigations.push(newInvestigationRow);
    this.filteredInvestigations.push([]); // Initialize an empty array for filtered medicines
  }

  Removeitem1(index: number) {
    this.investigations.removeAt(index);
    this.filteredInvestigations.splice(index, 1); // Remove the corresponding filtered medicines array
  }

  Addnewrow2() {
    this.items = this.reactform.get('diagnosis') as FormArray;
    this.items.push(this.Genrow2());
  }

  Addnewrow3() {
    this.items = this.reactform.get('complaints') as FormArray;
    this.items.push(this.Genrow3());
  }

  Removeitem2(index: any) {
    this.items = this.reactform.get('diagnosis') as FormArray;
    this.items.removeAt(index);
  }

  Removeitem3(index: any) {
    this.items = this.reactform.get('complaints') as FormArray;
    this.items.removeAt(index);
  }

  get medicines() {
    return this.reactform.get('medicines') as FormArray;
  }

  get investigations() {
    return this.reactform.get('investigations') as FormArray;
  }

  get diagnosis() {
    return this.reactform.get('diagnosis') as FormArray;
  }

  get complaints() {
    return this.reactform.get('complaints') as FormArray;
  }

  Genrow(): FormGroup {
    return new FormGroup({
      medicine: new FormControl('', Validators.required),
      dosage: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    });
  }

  Genrow1(): FormGroup {
    return new FormGroup({
      investigation: new FormControl('', Validators.required),
    });
  }

  Genrow2(): FormGroup {
    return new FormGroup({
      diagnosis: new FormControl('', Validators.required),
    });
  }

  Genrow3(): FormGroup {
    return new FormGroup({
      complaints: new FormControl('', Validators.required),
    });
  }

  ProceedSave() {
    if (this.reactform.valid) {
      const formData = this.reactform.value;
      console.log('Form data:', formData);
  
      this.prescriptionService.savePrescription(formData).subscribe({
        next: (response) => {
          alert('Prescription saved successfully!');
          console.log(response);
          
          if (response?.id) {
            this.downloadReceipt(response.id);  // Call download function
          }
  
          this.reactform.reset(); // Reset form after successful submission
          this.router.navigate(['/doctor/prescribed']);

        },
        error: (error) => {
          console.error('Error saving prescription:', error);
          alert('Failed to save prescription.');
        },
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
  downloadReceipt(id: number) {
    const format = 'pdf';
    const receiptUrl = `https://b5a5-103-4-117-150.ngrok-free.app/prescription/download?format=${format}&id=${id}`;
  
    this.http.get(receiptUrl, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        // Create a link element to open the PDF in a new tab
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';  // Open in new tab
        a.click();
  
        // Optional: Revoke the URL after a delay
        setTimeout(() => window.URL.revokeObjectURL(url), 5000);
  
        // Optionally, you can try triggering print in the new tab (if possible)
        setTimeout(() => {
          const printWindow = window.open(url, '_blank');
          if (printWindow) {
            printWindow.focus();
            printWindow.print();
          }
        }, 500);
      },
      error: (error) => {
        console.error('Error generating report:', error);
        alert('Failed to generate receipt.');
      }
    });
  }
  
  //     medicineControl = new FormControl(''); // Form control for medicine name input
  // selectedMedicine: string = ''; // Selected medicine name
  // selectedMedicines: any[] = []; // List of selected medicines
  // medicines1: any[] = []; // List of medicines from API

  // filteredMedicines: any[] = [];

  // // Fetch medicines from API
  // fetchMedicines1() {
  //   this.http.get<any[]>('http://localhost:9090/api/medicines').subscribe(
  //     (data) => {
  //       this.medicines1 = data || []; // Ensure medicines list is initialized
  //     },
  //     (error) => {
  //       console.error('Error fetching medicines:', error);
  //       alert('Failed to load medicine data.');
  //     }
  //   );
  // }

  // filterMedicines() {
  //   const input = this.medicineControl.value?.toLowerCase() || '';
  //   if (input.trim() === '') {
  //     this.filteredMedicines = [];
  //   } else {
  //     this.filteredMedicines = this.medicine.filter((medicine) =>
  //       medicine.medicineName.toLowerCase().includes(input)
  //     );
  //   }
  // }

  // // Select a medicine and set its name in the input box
  // selectMedicine(medicine: any) {
  //   this.medicineControl.setValue(medicine.name); // Set selected medicine name in input
  //   this.filteredMedicines = []; // Clear suggestions
  // }
}
