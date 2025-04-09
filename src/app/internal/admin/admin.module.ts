import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { MediDepartmentComponent } from './medi-department/medi-department.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { RoleSetComponent } from './role-set/role-set.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReportsComponent } from './reports/reports.component';
import { DepartmentComponent } from './department/department.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    DashboardComponent,
    DoctorsComponent,
    MediDepartmentComponent,
    DoctorRegistrationComponent,
    RegistrationComponent,
    RoleSetComponent,
    UserListComponent,
    ReportsComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
