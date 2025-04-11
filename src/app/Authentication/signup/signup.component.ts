import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  apiUrl = 'http://localhost:9090/api/auth/signup'; // Updated API Endpoint

  user = {
    username: '',
    userFirstName: '',
    userLastName: '',
    email: '',
    password: '',
    role: new Set<string>() // Using a Set to avoid duplicate roles
  };

  availableRoles = ['admin', 'mod', 'user']; // Role options
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  // Toggle Role Selection
  toggleRole(role: string) {
    if (this.user.role.has(role)) {
      this.user.role.delete(role);
    } else {
      this.user.role.add(role);
    }
  }

  // Convert role Set to an array before sending
  getRoleArray(): string[] {
    return Array.from(this.user.role);
  }

  // Validate Form
  validateForm(): boolean {
    if (!this.user.username || !this.user.userFirstName || !this.user.userLastName || !this.user.email || !this.user.password) {
      this.errorMessage = 'All fields are required!';
      return false;
    }
    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Invalid email format!';
      return false;
    }
    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters!';
      return false;
    }
    return true;
  }

  // Email Validation
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Submit Form Data
  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    const payload = { ...this.user, role: this.getRoleArray() };

    this.http.post(this.apiUrl, payload).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        this.resetForm();
      },
      (error) => {
        this.errorMessage = error.error?.message || 'User registration failed!';
      }
    );
  }

  onSubmit(){
    this.addData(this.signupForm.value).subscribe((val : any) => {
      console.log("User created succesfully");
      this.router.navigateByUrl('/login')
    })
  }

  signupForm : FormGroup = new FormGroup({
    username: new FormControl(),
    userFirstName: new FormControl(),
    userLastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    })

  // Reset Form
  resetForm() {
    this.user = {
      username: '',
      userFirstName: '',
      userLastName: '',
      email: '',
      password: '',
      role: new Set<string>()
    };
  }

  addData(signup : any){
    return this.http.post(this.apiUrl , signup)
  }
}


  // constructor(
  //   private signService: LoginService,
  //   private router: Router

  // ) { }

  // signupForm: FormGroup = new FormGroup({
  //   name: new FormControl(),
  //   email: new FormControl(),
  //   pass: new FormControl(),
  //   Cpass: new FormControl(),
  //   phone: new FormControl(),
  //   role: new FormControl(),
  // })

  // onSubmit() {
  //   this.signService.addData(this.signupForm.value).subscribe((val: any) => {
  //     console.log("SignIn successfully");
  //     this.router.navigateByUrl('/login')

  //   })
  // }


