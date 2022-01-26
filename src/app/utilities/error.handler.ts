import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationController } from './notification.controller';
import { NavigationController } from './navigation.controller';
import { Result } from '../interfaces/result';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthData } from '../interfaces/authData';
import { Constants } from './constant';
import { AuthService } from './../services/auth.service';
import { StorageService } from './../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private notify: NotificationController,
    private navController: NavigationController,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  public handleError<T>(request: HttpRequest<any>, next: HttpHandler) {
    return (error: any): Observable<any> => {
      // console.error(error); // log to console instead

      this.notify.hideLoader();

      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 400: //Bad Request
            let msg400: Result = new Result();
            msg400.success = false;
            msg400.title = 'Bad Request';
            msg400.message = error?.error.message ?? 'An error from the server';
            msg400.path = error.url?.toString();

            this.notify.showErrorMessage(msg400.title, msg400.message);

            return throwError(msg400 as Result);
          case 401: //Authentication error
            this.isRefreshing = false;
            return this.handle401Error(request, next);
          case 403: //Authentication error
            let msg403: Result = new Result();
            msg403.success = false;
            msg403.title = 'Privilege Access Required';
            msg403.message = `Access Denied: You do not have enough privilege to view this page!`;
            msg403.path = error.url?.toString();

            this.notify.showErrorMessage(msg403.title, msg403.message);

            this.navController.back();

            return of(msg403);
          //return throwError(msg403);
          case 500: //Authentication error
            let msg500: Result = new Result();
            msg500.success = false;
            msg500.title = 'Internal Server Error';
            msg500.message = `Internal Server Error: ${
              error?.error?.message ?? error.message
            }`;
            msg500.path = error.url?.toString();

            this.notify.showErrorMessage(msg500.title, msg500.message);

            //return throwError(msg500);
            return of(msg500);
          case 0:
            // possibly network error. Show toast
            let msg0: Result = new Result();
            msg0.success = false;
            msg0.title = 'Unknown Server Error';
            msg0.message =
              'Something went wrong! Please check your internet connection';
            msg0.path = error.url?.toString();

            this.notify.showErrorMessage(msg0.title, msg0.message);

            //return throwError(msg0);
            return of(msg0);
          default: {
            let msg: Result = new Result();
            msg.success = false;
            msg.title = 'Unknown Server Error';
            msg.message = `Unknown Server Error: ${error.message}`;
            msg.path = error.url?.toString();

            this.notify.showErrorMessage(msg.title, msg.message);

            //return throwError(msg);
            return of(msg);
          }
        }
      } else {
        let msg: Result = new Result();
        msg.success = false;
        msg.title = 'Client Side Error';
        msg.message = `Error: ${error.error.message}`;
        msg.path = error.url?.toString();

        this.notify.showErrorMessage(msg.title, msg.message);

        //return throwError(msg);
        return of(msg);
      }
    };
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    let param = {
      token: this.storageService.getAccessToken(),
      refreshToken: this.storageService.getRefreshToken(),
    };

    if (param.token.trim() == '') {
      //no token available. No need to refresh redirect user to login page
      this.router.navigate(['/login']);
      return next.handle(request);
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(param).pipe(
        switchMap((res: Result) => {
          this.isRefreshing = false;

          if (!res.success) {
            this.router.navigate(['/login']);
            return next.handle(request);
          } else {
            let data = res.content as AuthData;

            this.refreshTokenSubject.next(data.token);

            this.storageService.storeToken(data.token);
            this.storageService.storeRefreshToken(data.refreshToken);
            return next.handle(this.addToken(request, data.token));
          }
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  addToken(request: HttpRequest<any>, token: string) {
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return request;
  }
}
