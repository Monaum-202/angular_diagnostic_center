import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment/appointment.component';
import { PrescriptionCreateComponent } from './prescription-create/prescription-create.component';
import { RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { PrescriptionPadComponent } from './prescription-pad/prescription-pad.component';
import { NotepadComponent } from './notepad/notepad.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrescribedComponent } from './prescribed/prescribed.component';




@NgModule({
  declarations: [
    DoctorsComponent,
    AppointmentComponent,
    PrescriptionCreateComponent,
    PrescriptionPadComponent,
    NotepadComponent,
    ToDoListComponent,
    DashboardComponent,
    DepartmentComponent,
    PrescriptionComponent,
    PrescribedComponent

  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
    
  ]
})
export class DoctorsModule { }
