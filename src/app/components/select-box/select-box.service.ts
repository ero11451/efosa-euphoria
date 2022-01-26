import { SelectOption } from './select-box.options';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class SelectBoxService {
  private _OnItemSelected: Subject<SelectOption | null> =
    new Subject<SelectOption | null>();

  constructor() {}

  itemSelected(option: SelectOption | null): void {
    console.log('ItemSelected From Child: ' + JSON.stringify(option));
    this._OnItemSelected.next(option);
  }

  OnItemSelected() {
    return this._OnItemSelected.asObservable();
  }
}
