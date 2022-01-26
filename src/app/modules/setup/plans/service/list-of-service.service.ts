import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/utilities/constant';

@Injectable({
  providedIn: 'root'
})
export class ListOfServiceService {

  constructor(private http: HttpClient) { }
  getListOfService(){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Benefit/benefit-services')
    .pipe(tap((_) => console.log('benefit catigory')));
 }

 getListOfServiceByID(id:any){
  return this.http
  .get<any>(  Constants.BASE_URL +'api/Benefit/available-services' + id)
  .pipe(tap((_) => console.log('benefit catigory')));
 }

}
