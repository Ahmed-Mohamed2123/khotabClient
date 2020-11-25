import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private router: Router,
              private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = null;
        const authService = this.injector.get(AuthService);
        if ([401].indexOf(err.status) !== -1) {
          // Unauthorized, we will redirect him to login page
          this.openSnackbar('Login Session has expired', 'OK');
          authService.userLogout();
          this.router.navigate(['/auth/login-admin']);
        }
        else if ([403].indexOf(err.status) !== -1) {
          // Forbidden, we will redirect him to login page
          this.openSnackbar('This Resource is forbidden', 'OK');
          authService.userLogout();
          this.router.navigate(['/'], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        else if (err.status === 404) {
          if (authService.getToken()) {
            this.router.navigate(['/notFoundResource', err.status], {
              queryParams: {
                'Error-Status': err.status
              }
            });
          }
        }
        else if (err.status === 500){
          this.router.navigate(['/applicationError', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
