import { NavService } from './../../../services/nav.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/must-match.validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private resetLink: string;
  resetPasswordDto: FormGroup;
  submitted = false;
  passwordHide = true;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private snakBar: MatSnackBar,
              private footerShow: NavService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (!params.get('resetLink')) {
        router.navigate(['/']);
      }
      this.resetLink = params.get('resetLink');
    });
  }

  ngOnInit(): void {
    this.footerShow.showfooter.next(false);
    this.resetPasswordDto = this.fb.group({
        newPass: new FormControl(null, [Validators.required,
        Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        resetLink: new FormControl(this.resetLink)
      });
  }

  resetWithNewPassword(){
    this.submitted = true;
    this.authService.resetPassword(this.resetPasswordDto.value)
      .subscribe(response => {
        if (response) {
          this.snakBar.open('تم تغيير كلمه السر بنجاح', 'ok');
          setTimeout(() => {
            this.router.navigate(['/auth/login-admin']);
          }, 3500);
        }

      }, error => {
        this.snakBar.open('An unknown error occurred', 'ok');
      });
  }

}
