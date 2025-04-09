import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private httpClient: HttpClient) { }


  // private apiURL = "http://localhost:3000/lab_customer"
  private apiURL = "https://b5a5-103-4-117-150.ngrok-free.app/api/lab_customer"

  

  addData(customer: any) {
    return this.httpClient.post(this.apiURL, customer);
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

  updateData(customer:any){
    return this.httpClient.put(this.apiURL+ "/" + customer.id,customer)
  }

}
