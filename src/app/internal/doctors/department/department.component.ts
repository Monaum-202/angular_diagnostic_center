import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DoctorsService } from 'src/app/service/doctors/doctors.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{

constructor(
    private doctorsService : DoctorsService
   ){}

  onSubmit() {
    console.log(this.departmentForm.value);
    }
    
    
    
    deparmentList: any[] = [];

    ngOnInit(): void {
      this.doctorsService.getAll().subscribe((val : any) => {
        this.deparmentList = val  
      })
     }

      departmentForm: FormGroup = new FormGroup({
        name:new FormControl(''),
        details:new FormControl('')

      })


      deletePatient(id : any){
        this.doctorsService.deleteById(id).subscribe((val : any) =>{
          console.log("Data deleted");
          this.ngOnInit()
        })
       }
    }
    