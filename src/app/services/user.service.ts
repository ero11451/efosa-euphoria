import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Result } from '../interfaces/result';
import { Constants } from '../utilities/constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserFromAD(username: string): Observable<any> {
    return this.http
      .get<any>(`${Constants.BASE_URL}Users/active-directory/${username}`)
      .pipe(tap((_) => console.log('Providers')));
  }

  getUsers(): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}users`)
      .pipe(tap((_) => console.log('users')));
  }

  createUser(param: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}users/create`, param)
      .pipe(tap((_) => console.log('users')));
  }


  updateUser(param: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}users/update`, param)
      .pipe(tap((_) => console.log('users')));
  }

  getRoleMatrix(userRef: string): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}users/${userRef}/roles/matrix`)
      .pipe(tap((_) => console.log('users')));
  }

  saveUserRole(userRef: string, roleMap: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}users/${userRef}/roles/save`, roleMap)
      .pipe(tap((_) => console.log('users')));
  }

  getPermissionMatrix(userRef: string): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}users/${userRef}/permissions/matrix`)
      .pipe(tap((_) => console.log('users')));
  }

  saveUserPermission(userRef: string, roleMap: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}users/${userRef}/permissions/save`, roleMap)
      .pipe(tap((_) => console.log('users')));
  }

}
