
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit {

  constructor(
    private userServiceService : UserServiceService,private http: HttpClient
   ){}
   
   usersList: any[] = [];

  // ngOnInit(): void {
  //    this.userServiceService.getAllDoctors().subscribe((val : any) => {
  //     this.usersList = val  
  //   })
  // }

   


  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.http.get<any[]>('http://localhost:9090/api/users/moderators').subscribe({
      next: (data) => {
        this.usersList = data;
        console.log("User data fetched successfully", this.usersList);
      },
      error: (error) => {
        console.error("Error fetching user data:", error);
      }
    });
  }

  deletecategory(id : any){
    this.userServiceService.deleteById(id).subscribe((val : any) =>{
      console.log("Data deleted");
      this.ngOnInit()
    })
   }

}
