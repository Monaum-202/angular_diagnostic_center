import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './external/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './external/navbar/navbar.component';
import { FooterComponent } from './external/footer/footer.component';
import { HCheckupComponent } from './external/h-checkup/h-checkup.component';
import { CAppointmentComponent } from './external/c-appointment/c-appointment.component';
import { CardiologyDoctorListComponent } from './external/doctors_list/cardiology-doctor-list/cardiology-doctor-list.component';
import { OnlineDoctorListComponent } from './external/doctors_list/online-doctor-list/online-doctor-list.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { AdminComponent } from './internal/admin/admin.component';
import { LabComponent } from './internal/lab/lab.component';
import { MilonComponent } from './external/doctors/doctors_information/milon/milon.component';
import { LabEntryComponent } from './internal/lab-entry/lab-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HCheckupComponent,
    CAppointmentComponent,
    CardiologyDoctorListComponent,
    OnlineDoctorListComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    LabComponent,
    MilonComponent,
    LabEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
