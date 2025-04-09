import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
       this.time = new Date().toLocaleTimeString();
     }, 1000);

     setInterval(() => {
       const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
       this.date = new Date().toLocaleDateString('en-GB'); // en-GB ensures dd/mm/yyyy format
     }, 1000); // Update every second
     
  }

  time = ""
  date=""
}
