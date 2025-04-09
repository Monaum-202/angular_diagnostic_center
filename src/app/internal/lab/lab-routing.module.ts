import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ReportComponent } from './report/report.component';
import { LabInventoryComponent } from './lab-inventory/lab-inventory.component';
import { ReportPrintComponent } from './report-print/report-print.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'lab_test', pathMatch: 'full' },
  { path: "lab", component: LabComponent },
  { path: "lab_test", component: LabTestComponent },
  { path: "lab_report", component: ReportComponent },
  { path: "lab_inventory", component: LabInventoryComponent },
  { path: "report_print/:cId", component: ReportPrintComponent },
  { path: "report_print", component: ReportPrintComponent },
  { path: "invoice", component: InvoiceComponent },
  // { path: "prescription_pad", component: PrescriptionPadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
