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
export class BenefitService {

  constructor(private http: HttpClient) { }

  getlimit(): Observable<BenefitCategory> {
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Benefit/limit-types')
    .pipe(tap((_) => console.log('benefit catigory')));
   }

   getGetBenfitByPlanRef(ref:any): Observable<BenefitCategory> {
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Plan/benefits?planReferenceNumber='+ ref)
    .pipe(tap((_) => console.log('benefit catigory')));
   }
   getService(){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Benefit/benefit-services')
    .pipe(tap((_) => console.log('benefit catigory')));
   }
  getBenefit(): Observable<BenefitCategory> {
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Benefit')
    .pipe(tap((_) => console.log('benefit catigory')));
  }

  updateBenefit(value:any){
    return this.http
    .put<any>('https://172.20.5.27:8001/api/Benefit/id', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  createBenfit(value:BenefitCategory){
    return this.http
    .post<any>(Constants.BASE_URL+'api/Benefit/create', value)
    .pipe(tap((_) => console.log('benefit catigory')));

  }
  getBenefitAndCategory(){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Benefit/category')
    .pipe(tap((_) => console.log('get benefit bt category')));
  }
  deletBenefit(provider:any){
    return this.http
    .delete<any>('https://172.20.5.27:8001/api/Benefit',{body:provider} )
    .pipe(tap((_) => console.log('benefit catigory')));

  }
//  getBenefitById(id:any){
//     return this.http
//     .get<any>('https://172.20.5.27:8001/api/BenefitCategory')
//     .pipe(tap((_) => console.log('benefit catigory')));
//  }
  errorHandel(error: HttpErrorResponse){
    console.log(error)
   return throwError(error)
  }
}
