import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabEntryRoutingModule } from './lab-entry-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportComponent } from './report/report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PatientListComponent } from './patient-list/patient-list.component';


@NgModule({
  declarations: [
    DataEntryComponent,
    ReportComponent,
    SalesReportComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    LabEntryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LabEntryModule { }
