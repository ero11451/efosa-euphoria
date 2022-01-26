import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../utilities/constant';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getProvider(){
    return this.http
    .get<any>('https://172.20.5.27:8001/api/Providers?')
    .pipe(tap((_) => console.log('Providers'))); 
  }
  createProvider(param: any): Observable<any> {
    return this.http
      .post<any>(`${Constants.BASE_URL}Providers`, param)
      .pipe(tap((_) => console.log('Providers')));
  }
  
  searchForProvider(value:any):Observable<any> {
    return this.http.get('https://172.20.5.27:8001/api/Providers?'+ value)
    .pipe(tap((_) => console.log('Providers')));
  
  }
  searchProviderByTerm(value:string){
    return this.http.get('https://172.20.5.27:8001/api/Providers?SearchTerm='+ value)
    .pipe(tap((_) => console.log('Providers')));
  
  }
}
