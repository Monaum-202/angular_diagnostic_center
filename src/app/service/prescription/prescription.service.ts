import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private httpClient: HttpClient) { }

  // private apiUrl = "http://localhost:9090/api/prescriptions";
  private apiUrl = "http://localhost:9090/api/prescriptions";

  addData(user: any) {
    return this.httpClient.post(this.apiUrl, user)
  }

  getAll() {
    return this.httpClient.get(this.apiUrl)
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

  seach(text: string){
    return this.httpClient.get("http://localhost:9090/api/medicines" + "/search?medicineName="+text)
  }

  savePrescription(data: any): Observable<any> {
    return this.httpClient.post("http://localhost:9090/api/prescriptions", data);
  }

}
