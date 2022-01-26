import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdleState } from '../enums/IdleState.enum';
import { Result } from '../interfaces/result';
import { Constants } from '../utilities/constant';
import { AuthData } from './../interfaces/authData';
import { IdleService } from './idle.service';
import { StorageService } from './storage.service';
import { NotificationController } from './../utilities/notification.controller';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private idleService: IdleService,
    private notify: NotificationController,
    private router: Router
  ) {
    this.checkUserData();
    this.ListenForIdleStateChange();
  }

  checkUserData() {
    let user = this.storageService.getUSer();
    if (user === undefined || user === null) {
      this.authState.next(false);
      this.router.navigate(["/login"]);
    } else {
      this.authState.next(true);
    }
  }

  IsAuthenticated() {
    return this.authState.value;
  }

  OnAuthStatusChange() {
    return this.authState.asObservable();
  }

  ListenForIdleStateChange() {
    this.idleService.OnIdleStatusChange().subscribe((status) => {
      if (status === IdleState.TimedOut) {
        this.storageService.clearAuthData();
      }
    });
  }

  async logUserOut() {
    await this.notify.showLoader('');
    this.logout(null).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      if (res.success) {
        this.storageService.clearAuthData();
        this.storageService.clearUserData();
        this.authState.next(false);
      }
    });
  }

  login(data: any): Observable<any> {
    return this.http
      .post<any>(Constants.BASE_URL + 'auth/login', data)
      .pipe(tap((_) => console.log('auth')));
  }

  logout(data: any): Observable<any> {
    return this.http
      .post<any>(Constants.BASE_URL + 'auth/logout', data)
      .pipe(tap((_) => console.log('auth')));
  }

  refreshToken(param: any): Observable<any> {
    return this.http
      .post<any>(Constants.BASE_URL + 'auth/tokens/refresh', param)
      .pipe(tap((_) => console.log('auth')));
  }

  maskUserAsAuthenticated(authData: AuthData) {
    this.storageService.storeToken(authData.token);
    this.storageService.storeUser(authData.user);
    this.storageService.storeRefreshToken(authData.refreshToken);

    this.authState.next(true);
  }
}
