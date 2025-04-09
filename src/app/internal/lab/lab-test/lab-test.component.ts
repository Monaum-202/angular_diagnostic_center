import { Component } from '@angular/core';
import { LabService } from 'src/app/service/lab/lab.service';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent {
  httpClient: any;
  apiURL: any;

constructor(private labService:LabService){}


  customerList:any[]=[];

  ngOnInit(): void {
    this.labService.getAll().subscribe((res:any) => {
      this.customerList=res;
    })

    
  }



deleteUser(id:any){
  this.labService.removeUser(id).subscribe((res:any) => {
    console.log('Data delete');
    this.ngOnInit();
  })
}


}
