import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }


  // private apiURL = "http://localhost:3000/signup"
  private apiURL = "https://b5a5-103-4-117-150.ngrok-free.app/api/signup"

  

  addData(signup: any) {
    return this.httpClient.post(this.apiURL, signup);
  }

  removeUser(id: any) {
    return this.httpClient.delete(this.apiURL + "/" + id)
  }

  getAll() {
    return this.httpClient.get(this.apiURL);
  }

  getById(id:any){
    return this.httpClient.get(this.apiURL + "/" + id);
  }

  updateData(signup:any){
    return this.httpClient.put(this.apiURL+ "/" + signup.id,signup)
  }
}
