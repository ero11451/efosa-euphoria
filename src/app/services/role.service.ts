import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Result } from "../interfaces/result";
import { Constants } from "../utilities/constant";

@Injectable({
  providedIn: 'root',
})
export class RoleService implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}roles`)
      .pipe(tap((_) => console.log('roles')));
  }

  getRole(uid: string): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}roles/${uid}`)
      .pipe(tap((_) => console.log('roles')));
  }

  createRole(param: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}roles/create`, param)
      .pipe(tap((_) => console.log('roles')));
  }

  updateRole(param: any): Observable<Result> {
    return this.http
      .put<any>(`${Constants.BASE_URL}roles/update`, param)
      .pipe(tap((_) => console.log('roles')));
  }

  deleteRole(uid: string): Observable<Result> {
    return this.http
      .delete(`${Constants.BASE_URL}roles/${uid}`)
      .pipe(tap((_) => console.log('roles')));
  }

  getRoleUsers(roleUid: string): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}roles/users/${roleUid}`)
      .pipe(tap((_) => console.log('roles')));
  }

  getPermissionMatrix(roleUid: string): Observable<Result> {
    return this.http
      .get<any>(`${Constants.BASE_URL}roles/${roleUid}/permissions/matrix`)
      .pipe(tap((_) => console.log('roles')));
  }

  saveRolePermission(roleUid: string, roleMap: any): Observable<Result> {
    return this.http
      .post<any>(`${Constants.BASE_URL}roles/${roleUid}/permissions/save`, roleMap)
      .pipe(tap((_) => console.log('roles')));
  }


  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
