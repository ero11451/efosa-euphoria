import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from 'src/app/interfaces/authData';
import { LoginModel } from 'src/app/interfaces/loginModel';
import { Result } from 'src/app/interfaces/result';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationController } from 'src/app/utilities/notification.controller';
import { IdleService } from './../../../services/idle.service';
import { StorageService } from './../../../services/storage.service';
import { UserModel } from './../../../interfaces/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-out',
  templateUrl: './time-out.component.html',
  styleUrls: ['./time-out.component.scss'],
})
export class TimeOutComponent implements OnInit {
  formLogin!: FormGroup;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  userLogin!: LoginModel;

  userModel?: UserModel | null;

  constructor(
    private idleService: IdleService,
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotificationController,
    private storageService: StorageService,
    private router: Router
  ) {
    this.userModel = this.storageService.getUSer();
  }

  ngOnInit(): void {
    this.initForm();
    this.idleService.StopObserving();
  }

  initForm() {
    this.formLogin = this.fb.group({
      password: [
        'qaswderfgt',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login() {
    if (this.userModel === undefined) {
      this.router.navigate(["/login"]);
      return;
    }

    if (!this.formLogin.valid) {
      Object.keys(this.formLogin.controls).forEach((field) => {
        const control = this.formLogin.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
        return;
      });

      return;
    }

    this.userLogin = Object.assign({}, this.formLogin.value);
    this.userLogin.username = this.userModel?.username;

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

}
