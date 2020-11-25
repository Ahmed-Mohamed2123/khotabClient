import { NavService } from 'src/app/services/nav.service';
import { User } from './../../../interfaces/auth';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { InvalidCredentialComponent } from 'src/app/shared/components/invalid-credential/invalid-credential.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDto: FormGroup;
  forgotDto: FormGroup;
  isSent: boolean = false;
  message: string = null;

  showProgress: boolean;

  // spinner
  state = '';

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private cookieService: CookieService,
              private navShow: NavService,
              private spinner: NgxSpinnerService) {
    if (authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.navShow.showNavbar.next(true);
    this.navShow.showfooter.next(true);
    this.loginDto = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });

    this.forgotDto = this.fb.group({
      email: new FormControl(null, [Validators.required])
    });
  }

  adminLogin() {
    this.state = 'انتظر من فضلك';
    this.showSpinner();
    this.authService.loginAdmin(this.loginDto.value)
      .subscribe((data: {accessToken: string, user: User}) => {
        const accessToken = data.accessToken;
        this.cookieService.set('accessToken', accessToken);
        this.authService.prepareUserData();
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
          this.hideSpinner();
        }, 500);
      }, error => {
        this.openModal();
        this.hideSpinner();
        console.log(error);
      });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(InvalidCredentialComponent, {
      width: '100%',
      data: {}
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }

  sentEmailForgotPassword() {
    this.showProgress = true;
    this.authService.forgotPassword(this.forgotDto.value)
      .subscribe(result => {
        this.showProgress = false;
        this.message = 'تم ارسال طلبك بنجاح, يرجى تفحص الجيميل الخاص بك لتأكيد طلبك واعاده تعيين كلمه المرور الخاصه بك';
        this.isSent = true;
      });
  }

  // For Spinners
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

}
