import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private apiService: AuthService){}
  sharedMessage: string = '';
  subscription!: Subscription

  ngOnInit(): void {
    // this.subscription = this.apiService.currentMassage.subscribe(message =>
    //   this.sharedMessage = message);
    
  }
  title = 'hospital';
}
