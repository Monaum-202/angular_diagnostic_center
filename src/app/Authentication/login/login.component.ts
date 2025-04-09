import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoginService } from 'src/app/service/login/login.service';
import { StorageService } from 'src/app/storageService/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService : AuthService,
    private storageService : StorageService,

  ) { }

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      const role = this.storageService.getUserRole();
      if (role) {
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'ROLE_MODERATOR') {
          this.router.navigate(['/moderator']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        this.errorMessage = "Invalid username or password!";
      }

    }
  }

  onLogin() {
    
    if (!this.username || !this.password) {
      this.errorMessage = "Username and password are required!";
      return;
    }


    console.log(this.username, this.password);



    this.authService.login(this.username, this.password).subscribe({

      next: data => {
        this.storageService.saveUser(data);
        const role = this.storageService.getUserRole();
        if (role) {

          if (role === 'ROLE_ADMIN') {
            console.log('-------------------', role);
            this.router.navigate(['/admin']);
          } else if (role === 'ROLE_MODERATOR') {
            console.log('-------------------', role);
            this.router.navigate(['/doctor']);
          } else if (role === 'ROLE_LAB_ENTRY') {
            console.log('-------------------', role);
            this.router.navigate(['/lab_entry']);
          }
          else {
            this.router.navigate(['/user']);
          }
        } else {
          this.errorMessage = "Invalid username or password!";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });

  }
  form: any = {
    username: null,
    password: null
  };

  reloadPage(): void {
    window.location.reload();
  }
 setName( name : string){
   this.authService.setUserName(name);
 }
  
}

//   loginForm: FormGroup = new FormGroup({
//     email: new FormControl(),
//     pass: new FormControl(),
//   })

//   userList: any[] = [];
//   user: any = {};

//   onSubmit() {
//     this.loginService.getAll().subscribe((val: any) => {
//       this.userList = val;
      
// console.log(val);
// console.log(this.loginForm.value.email,this.loginForm.value.pass);



//       let flag = false;

//       for (let i = 0; i < this.userList.length; i++) {
//         console.log(this.userList[i].email,this.userList[i].pass);
//         if (this.loginForm.value.email == this.userList[i].email &&
//           this.loginForm.value.pass == this.userList[i].pass) {
//             console.log();
            
//           localStorage.setItem("isLogin", "true");
//           localStorage.setItem("email", this.userList[i].email);
//           localStorage.setItem("role", this.userList[i].role);
//           this.user = this.userList[i];
//           flag = true;
//         }

//       }


//       if(flag == true){
//         console.log(this.user);
//         this.authService.changeMessage('true')
//         if (this.user.role === 'Doctor') {
//           this.router.navigateByUrl('/doctor');
//         } else if (this.user.role === 'Lab') {
//           this.router.navigateByUrl('/lab');
//         } else if (this.user.role === 'Admin') {
//           this.router.navigateByUrl('/admin-dashboard');
//         }
//       }else{
//         alert("Incorrect Email or Password!")
//       }
//     })
//   }


