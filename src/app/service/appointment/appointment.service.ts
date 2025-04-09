import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) { }
  
  
  // private apiUrl = "http://localhost:9090/api/doctorAppointments"
  private apiUrl = "https://ideally-precious-fish.ngrok-free.app/api/doctorAppointments"

  // https://b5a5-103-4-117-150.ngrok-free.app/
  
  addData(user: any) {
    return this.httpClient.post(this.apiUrl, user)
  } 

  // getAll() {
  //   return this.httpClient.get(this.apiUrl)
  // }
  // /patients/{userName}
  getAll(userName:any) {
    return this.httpClient.get(this.apiUrl+"/patients/"+userName)
  }

  deleteById(id: any) {
    return this.httpClient.delete(this.apiUrl+ "/"+ id)
  }

  getById(id: any){
    return this.httpClient.get(this.apiUrl+ "/"+ id)
  }

  updateData(user: any){
    console.log(user);
    
    return this.httpClient.put(this.apiUrl+ "/"+ user.id, user)
  }
}




// getAll() {
//   const storedUser = sessionStorage.getItem("auth-user");
//   if (!storedUser) {
//     console.error("No user data found in session storage!");
//     return;
//   }

//   const user = JSON.parse(storedUser);
//   const userName = user?.userName;

//   if (!userName) {
//     console.error("Username not found in session storage!");
//     return;
//   }

//   return this.httpClient.get(`${this.apiUrl}/patients/${userName}`);
// }
