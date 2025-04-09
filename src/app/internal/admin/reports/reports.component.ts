import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {



  exportFormats = ['PDF', 'Excel', 'Excel Data Only'];
  selectedFormat = 'PDF';

  constructor(private fb: FormBuilder,private http: HttpClient) {
  }

  clearForm() {
    
  }



  generateReport() {
    
  }

  format: string = 'pdf';  // Default format (can be changed by user)
  fromDate: string = '';   // Start date in ISO 8601 format
  toDate: string = ''; // End date (ISO 8601 format)


  // Method to trigger the file download
  downloadFile(): void {
    // Prepare the request parameters
    const params = new HttpParams()
      .set('format', this.format)
      .set('formDate', this.fromDate)
      .set('toDate', this.toDate);

    // Send GET request to backend to download the file
    this.http.get('http://localhost:9090/download', {
      params,
      responseType: 'blob'  // This makes sure we get the file as a Blob
    }).subscribe((response: Blob) => {
      // Create a temporary link element to trigger the file download
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(response);
      downloadLink.href = url;
      downloadLink.download = `report.${this.format}`;  // Set the filename for download
      downloadLink.click();  // Trigger the click event to start downloading

      // Clean up the object URL after download
      window.URL.revokeObjectURL(url);
    }, (error) => {
      console.error('Download failed', error);
    });
  }
}
