import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-h-checkup',
  templateUrl: './h-checkup.component.html',
  styleUrls: ['./h-checkup.component.scss']
})
export class HCheckupComponent implements OnInit{

  onSubmit() {
    console.log(this.appointmentForm.value);
    }
    
    
    
      ngOnInit(): void {
       
      }

      appointmentForm: FormGroup = new FormGroup({
        name:new FormControl(''),
        email:new FormControl(''),
        phone:new FormControl(''),
        date:new FormControl(''),
        department:new FormControl(''),
        message:new FormControl('')
      })
}
