import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './external/home/home.component';

import { DoctorsComponent } from './internal/doctors/doctors.component';
import { NavbarComponent } from './external/navbar/navbar.component';
import { FooterComponent } from './external/footer/footer.component';
import { CAppointmentComponent } from './external/c-appointment/c-appointment.component';
import { HCheckupComponent } from './external/h-checkup/h-checkup.component';
import { OnlineDoctorListComponent } from './external/doctors_list/online-doctor-list/online-doctor-list.component';
import { CardiologyDoctorListComponent } from './external/doctors_list/cardiology-doctor-list/cardiology-doctor-list.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { LabComponent } from './internal/lab/lab.component';
import { MilonComponent } from './external/doctors/doctors_information/milon/milon.component';
import { AdminComponent } from './internal/admin/admin.component';
import { LabEntryComponent } from './internal/lab-entry/lab-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'cac', component: CAppointmentComponent },
  { path: 'hcc', component: HCheckupComponent },
  { path: 'Online_Doctors', component: OnlineDoctorListComponent },
  { path: 'Cardiologist', component: CardiologyDoctorListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dr_milon', component: MilonComponent },
  { path: 'doctor', component: DoctorsComponent, loadChildren: () => import('./internal/doctors/doctors.module').then(x => x.DoctorsModule) },
  { path: 'lab', component: LabComponent, loadChildren: () => import('./internal/lab/lab.module').then(x => x.LabModule) },
  { path: 'admin', component: AdminComponent, loadChildren: () => import('./internal/admin/admin.module').then( x => x.AdminModule)},
  { path: 'lab_entry', component:  LabEntryComponent, loadChildren: () => import( './internal/lab-entry/lab-entry.module').then(x => x.LabEntryModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
