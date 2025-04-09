import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit{
  constructor(
    private appointmentService : AppointmentService
   ){}

   patientList: any[] = [];

  // ngOnInit(): void {
  //   const user = sessionStorage.getItem("auth-user");
  //   this.appointmentService.getAll().subscribe((val : any) => {
  //     this.patientList = val  
  //   })
  //  }
  
  ngOnInit(): void {
    const storedUser = sessionStorage.getItem("auth-user");
  
    if (storedUser) {
      const user = JSON.parse(storedUser); 
      if (user?.user.userName) {
        this.appointmentService.getAll(user?.user.userName).subscribe({
          next: (val: any) => {
            this.patientList = val;  
          },
          error: (err) => {
            console.error("Error fetching patient list:", err);
          }
        });
      } else {
        console.error("Username not found in session storage!");
      }
    } else {
      console.error("No user data found in session storage!");
    }
  }
  

   

   deletePatient(id : any){
    this.appointmentService.deleteById(id).subscribe((val : any) =>{
      console.log("Data deleted");
      this.ngOnInit()
    })
   }

}



// ngOnInit(): void {
//   const storedUser = sessionStorage.getItem("auth-user");

//   if (storedUser) {
//     const user = JSON.parse(storedUser); // Parse JSON string into object
//     if (user?.userName) {
//       this.appointmentService.getAll().subscribe({
//         next: (val: any) => {
//           this.patientList = val;  
//         },
//         error: (err) => {
//           console.error("Error fetching patient list:", err);
//         }
//       });
//     } else {
//       console.error("Username not found in session storage!");
//     }
//   } else {
//     console.error("No user data found in session storage!");
//   }
// }
