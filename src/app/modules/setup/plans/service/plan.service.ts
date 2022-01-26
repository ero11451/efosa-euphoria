import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Result } from 'src/app/interfaces/result';
import { Constants } from 'src/app/utilities/constant';
import { Plan } from './interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getPlan(): Observable<Plan> {
    return this.http
    .get<any>( Constants.BASE_URL + 'api/Plan/base')
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  getEligableProvider(ref:string){
    return this.http
    .get<any>( Constants.BASE_URL + 'api/Plan/eligible-providers?planReferenceNumber='+ ref)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  getPlanPriview(ref:string){
    return this.http
    .get<any>( Constants.BASE_URL + `api/Plan/planReferenceNumber?planReferenceNumber= ${ref}`)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  addProviderTOPlan(value:any){
    return this.http
    .post<any>(Constants.BASE_URL + 'api/Plan/add-provider', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  activatePlan(ref:string){
    return this.http
    .post<any>(Constants.BASE_URL + 'api/Plan/activate?planReferenceNumber='+ ref,{})
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  addBenentToPlan(value:any){
    return this.http
    .post<any>(Constants.BASE_URL + 'api/Plan/add-benefit', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  searchForProvider(value:any): Observable<any> {
    return this.http
    .get<any>( Constants.BASE_URL + 'api/Plan/base')
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  getBasePlan(){
    return this.http
    .get<any>(Constants.BASE_URL + 'api/Plan/base')
    .pipe(tap((_) => console.log('updateBenefit')));
  }

  searchForPlan(text:any){
    return this.http
    .get<any>(Constants.BASE_URL + 'api/Plan?keyword=' + text)
    .pipe(tap((_) => console.log('updateBenefit')));
  }

  updateBenefit(value:any){
    return this.http
    .put<any>( Constants.BASE_URL + 'api/BenefitCategory', value)
    .pipe(tap((_) => console.log('updateBenefit')));
  }
  createPlan(value:Plan){
    return this.http
    .post<any>(Constants.BASE_URL +  'api/Plan/create', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }

  getProviderOfPlan(planReferenceNumber:any){
    return this.http
    .get<any>( Constants.BASE_URL + 'api/Plan/providers?planReferenceNumber='+ planReferenceNumber)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  createCustomizedBenfit(value:Plan){
    return this.http
    .post<any>('https://172.20.5.27:8001/api/Plan/create-customize', value)
    .pipe(tap((_) => console.log('benefit catigory')));
  }
  
  deletePlan(id:any){
    return this.http
    .post<any>('https://172.20.5.27:8001/api/Plan/delete?planId='+  id, {})
    .pipe(tap((_) => console.log('benefit catigory')));

  }
 getBenefitById(id:any){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/BenefitCategory')
    .pipe(tap((_) => console.log('benefit catigory')));
 }
  errorHandel(error: HttpErrorResponse){
    console.log(error)
   return throwError(error)
  }
}
