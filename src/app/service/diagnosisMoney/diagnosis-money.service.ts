import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisMoneyService {

     constructor(private httpClient: HttpClient) { }


      private apiUrl = "http://localhost:9090/api/MoneyReceipt"
//       private apiUrl = "https://ideally-precious-fish.ngrok-free.app/api/MoneyReceipt"




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
}
