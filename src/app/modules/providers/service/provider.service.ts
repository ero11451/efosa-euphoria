import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  Branch = new BehaviorSubject({})
  constructor() { }

}
