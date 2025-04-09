import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-c-appointment',
  templateUrl: './c-appointment.component.html',
  styleUrls: ['./c-appointment.component.scss']
})
export class CAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  departments: any[] = [];
  doctor: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize form with validators
    this.appointmentForm = this.fb.group({
      patientName: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      appointmentDate: new FormControl('', Validators.required),
      message: new FormControl(''),
      department: new FormControl({
        id: [0, Validators.required]
      }),
      doctors: new FormControl({
        id: [0, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  // Load departments from API
  loadDepartments(): void {
    this.http.get<any[]>('http://localhost:9090/api/department').subscribe(
      (response) => {
        this.departments = response;
        
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }


  onDepartmentChange(event: Event): void {
    const departmentId = (event.target as HTMLSelectElement).value;
    console.log(departmentId);
    

    if (!departmentId || departmentId === 'null') {
      this.doctor = [];
      return;
    }
  
    // Call the Spring Boot endpoint to fetch doctors by department
    this.http.get<any[]>(`http://localhost:9090/api/doctorAppointments/doctors/by-department/${departmentId}`)
      .subscribe({
        next: (response) => {
          // Map response to a cleaned-up doctors list
          this.doctor = response.map((doctors: any) => ({
            id: doctors.id,
            name: doctors.name,
            // specialization: doctor.specialization
           
            
          }));
          console.log(this.doctor);
          
        },
        error: (error) => {
          console.error('Error loading doctors:', error);
          // Clear doctors list if there's an error
          this.doctor = [];
          
          
        }
      });
    }  

  // Submit appointment form data to backend API
  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

  
    console.log('Form Data:', this.appointmentForm.value);
  
    const url = 'http://localhost:9090/api/doctorAppointments'; // Spring Boot backend
    this.http.post(url, this.appointmentForm.value,{ responseType: 'text' }).subscribe((res : any)=>{
     
        console.log('Appointment submitted successfully:', res);
        alert('Appointment created successfully!');
        this.appointmentForm.reset();
      
    });
  }
}  

