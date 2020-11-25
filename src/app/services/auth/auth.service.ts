import { UserInfo } from './../../interfaces/userInfo';
import { ApiEndpoints } from './../../shared/end-points';
import { User } from './../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  loginAdmin(loginDto: any): Observable<{accessToken: string, user: User}> {
    try {
      return this.http.post<{accessToken: string, user: User}>(ApiEndpoints.AuthEndPoints.loginAdmin, loginDto);
    } catch (error) {
      console.error(error);
    }
  }

  pUserData(): Observable<UserInfo> {
    try {
      return this.http.get<UserInfo>(ApiEndpoints.AuthEndPoints.getUserInfo);
    } catch (error) {
      console.error(error);
    }
  }

  prepareUserData() {
    if (this.isLoggedIn()) {
      this.pUserData().subscribe((userInfo: UserInfo) => {
        this.currentUser.next(userInfo['data']);
      });
    }
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('accessToken');
  }

  userLogout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/auth/login-admin']);
  }

  isAdmin(): boolean {
    return this.currentUser.value['role'].some(role => role === 'admin');
  }

  getToken() {
    return this.cookieService.get('accessToken');
  }

  forgotPassword(email: string) {
    try {
      return this.http.put<any>(ApiEndpoints.AuthEndPoints.forgotPassword, email);
    } catch (error) {
      console.error(error);
    }
  }

  resetPassword(resetPasswordDto: any) {
    try {
      return this.http.put<any>(ApiEndpoints.AuthEndPoints.resetPassword, resetPasswordDto);
    } catch (error) {
      console.error(error);
    }
  }
}
