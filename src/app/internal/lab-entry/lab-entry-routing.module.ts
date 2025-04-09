import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabEntryComponent } from './lab-entry.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [

     { path: '', redirectTo: 'Data_Entry', pathMatch: 'full' },
      {path:"LabEntry_dashboard", component: LabEntryComponent},
    {path:"Data_Entry", component:DataEntryComponent},
    {path:"sales_report", component:SalesReportComponent},
  //   {path:"prescription/:pId", component:PrescriptionCreateComponent},
    {path:"patient_list", component:PatientListComponent},
  //   {path:"prescription_pad", component:PrescriptionPadComponent},
  //   {path:"note", component:NotepadComponent},
  //   {path:"to_do", component:ToDoListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabEntryRoutingModule { }
