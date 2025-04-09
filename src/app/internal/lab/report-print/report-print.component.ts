import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabService } from 'src/app/service/lab/lab.service';

@Component({
  selector: 'app-report-print',
  templateUrl: './report-print.component.html',
  styleUrls: ['./report-print.component.scss']
})
export class ReportPrintComponent {
  @ViewChild('contentToPrint', { static: false }) contentToPrint!: ElementRef;


  print() {

    const printWindow = window.open('', '', 'height=600,width=800');
    const contentElement = this.contentToPrint.nativeElement.cloneNode(true);

    // Update input fields with their values
    const inputs = contentElement.querySelectorAll('input, textarea, select');
    inputs.forEach((input: any) => {
      const span = document.createElement('span');
      span.textContent = input.value; // Add the input value
      input.replaceWith(span); // Replace the input field with a span containing its value
    });

    const content = contentElement.innerHTML;
    const styles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
        }
        h1, h2, h3 {
          color: #333;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table, th, td {
          border: 1px solid #ccc;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        .content {
          padding: 10px;
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      </style>
    `;

    // Write content with styles to print window
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
          ${styles}
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  }

  
  
  constructor(
    private labService: LabService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  id!: any;
  customerList!: any


  labCustomerForm: FormGroup = new FormGroup({
    id: new FormControl(),
    billDate: new FormControl(),
    patientType: new FormControl(),
    patientName: new FormControl(),
    sex: new FormControl(),
    age: new FormControl(),
    specimen: new FormControl(),
    bedMobileNo: new FormControl(),
    invTime: new FormControl(),
    drCode: new FormControl(),
    invoiceNo: new FormControl(),
    sampleNo: new FormControl(),
  })




  onSubmit() {
    this.labService.addData(this.labCustomerForm.value).subscribe((val: any) => {
      console.log("Prescription created succesfully");
      console.log(this.labCustomerForm.value);

      this.router.navigateByUrl('lab/report_print/' + val.id)
    })
  }

  customer: any = null
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('cId');

    this.labService.getById(this.id).subscribe((val: any) => {
      this.customer = val;
      console.log(this.customer);

      this.labCustomerForm.setValue(this.customerList)




      // const id = this.route.snapshot.paramMap.get('cId');
      console.log(this.id);

      if (this.id) {
        this.labService.getById(this.id).subscribe((val: any) => {
          this.customer = val;
          console.log(val);

        });
      }
      this.labService.getAll().subscribe((val: any) => {
        this.customerList = val;
      });
    })
  }
}
