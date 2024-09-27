import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../Services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.error(errorMsg);
          this.notificationService.showError(errorMsg);
          return throwError(() => new Error(errorMsg));
        })
      )
  }
}