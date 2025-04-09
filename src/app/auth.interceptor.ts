// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Example: Add JWT token and ngrok header
    const authToken = 'your-jwt-token-here';

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
    });

    return next.handle(modifiedReq);
  }
}
