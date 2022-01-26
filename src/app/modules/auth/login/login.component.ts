import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/loginModel';
import { NotificationController } from './../../../utilities/notification.controller';
import { AuthService } from './../../../services/auth.service';
import { Result } from 'src/app/interfaces/result';
import { AuthData } from './../../../interfaces/authData';
import { IdleService } from 'src/app/services/idle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  userLogin!: LoginModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationController,
    private fb: FormBuilder,
    private authService: AuthService,
    private idleService: IdleService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listenForAuthChanges();
    this.idleService.StopObserving();
  }

  initForm() {
    this.formLogin = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      rememberMe: [false],
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login() {
    if (!this.formLogin.valid) {
      Object.keys(this.formLogin.controls).forEach((field) => {
        const control = this.formLogin.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
        return;
      });

      return;
    }

    this.userLogin = Object.assign({}, this.formLogin.value);

    await this.notify.showLoader('');
    this.authService.login(this.userLogin).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        this.authService.maskUserAsAuthenticated(res.content as AuthData);
      } else {
        this.notify.showErrorMessage('', res.message);
      }
    });
  }

  listenForAuthChanges() {
    this.authService.OnAuthStatusChange().subscribe((state) => {
      if (state === true) {
        this.router.navigate(['/']).then(() => {
          this.idleService.Start();
        });
      }
    });
  }
}
