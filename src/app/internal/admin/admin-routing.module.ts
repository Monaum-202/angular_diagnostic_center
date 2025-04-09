import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { MediDepartmentComponent } from './medi-department/medi-department.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { RoleSetComponent } from './role-set/role-set.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReportsComponent } from './reports/reports.component';
import { DepartmentComponent } from './department/department.component';



const routes: Routes = [

    { path: '', redirectTo: 'user_list', pathMatch: 'full' },
      {path:"admin_dashboard", component:DashboardComponent},
    {path:"doctor_reg", component:DoctorRegistrationComponent},
    
    {path:"user_list", component:UserListComponent},
    {path:"reports", component:ReportsComponent},
  //   {path:"prescription/:pId", component:PrescriptionCreateComponent},
    {path:"department", component:DepartmentComponent},
  //   {path:"prescription_pad", component:PrescriptionPadComponent},
  //   {path:"note", component:NotepadComponent},
  //   {path:"to_do", component:ToDoListComponent},
  {path:"role_set/:userName", component:RoleSetComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
