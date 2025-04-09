import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // private isDarkMode = false;

  // constructor() {
  //   // Load theme preference from local storage
  //   this.isDarkMode = localStorage.getItem('theme') === 'dark';
  //   this.updateTheme();
  // }

  // toggleTheme() {
  //   this.isDarkMode = !this.isDarkMode;
  //   localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  //   this.updateTheme();
  // }

  // private updateTheme() {
  //   if (this.isDarkMode) {
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //   }
  // }
}