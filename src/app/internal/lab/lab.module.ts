import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { ReportComponent } from './report/report.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { LabInventoryComponent } from './lab-inventory/lab-inventory.component';
import { ReportPrintComponent } from './report-print/report-print.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    ReportComponent,
    LabTestComponent,
    LabInventoryComponent,
    ReportPrintComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
  ]
})
export class LabModule { }
