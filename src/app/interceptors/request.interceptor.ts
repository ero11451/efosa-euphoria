import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Store } from '../utilities/constant';
import { ErrorHandler } from './../utilities/error.handler';
import { NotificationController } from './../utilities/notification.controller';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private errorHandler: ErrorHandler,
    private notify: NotificationController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (Store.AUTH_TOKEN) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${Store.AUTH_TOKEN}`,
        },
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

/*     request = request.clone({
      withCredentials: true,
    }); */

    //this.notify.showLoader('');

    return next.handle(request).pipe(
      finalize(() => {
        this.notify.hideLoader();
      }),
      catchError(this.errorHandler.handleError(request, next))
    );
  }
}
