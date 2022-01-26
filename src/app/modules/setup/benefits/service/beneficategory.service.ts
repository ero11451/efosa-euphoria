import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Result } from 'src/app/interfaces/result';
import { Constants } from 'src/app/utilities/constant';
import { BenefitCategory } from './interface/benfit';

@Injectable({
  providedIn: 'root'
})
export class BenefitCategoryService {

  constructor(private http: HttpClient) { }

  getBenefitCategory(): Observable<BenefitCategory> {
    return this.http
    .get<any>('https://172.20.5.27:8001/api/BenefitCategory')
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  updateBenefitCategory(value:any){
      console.log('this is form the service', value)
    return this.http
    .put<any>('https://172.20.5.27:8001/api/BenefitCategory/id', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  createBenfitCategory(value:BenefitCategory){
    console.log(value)
    return this.http
    .post<any>('https://172.20.5.27:8001/api/BenefitCategory/create', value)
    .pipe(tap((_) => console.log('benefit catigory')));

  }
  deletBenefitCategory(benefit:any){
    return this.http
    .delete<any>('https://172.20.5.27:8001/api/BenefitCategory', {body: benefit})
    .pipe(tap((_) => console.log('benefit catigory')));

  }
 getCategoryBenefitById(id:any){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/BenefitCategory')
    .pipe(tap((_) => console.log('benefit catigory')));
 }
  errorHandel(error: HttpErrorResponse){
    console.log(error)
   return throwError(error)
  }
}
