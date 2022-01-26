import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '../utilities/constant';
import { UserModel } from './../interfaces/userModel';
import { LocalStorageService } from './local.storage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private localStorageService: LocalStorageService) {}

  storeToken(token: string) {
    //Store.AUTH_TOKEN = token;
    this.localStorageService.set('AUTH_TOKEN', token);
  }

  storeRefreshToken(token: string) {
    //Store.REFRESH_TOKEN = token;
    this.localStorageService.set('REFRESH_TOKEN', token);
  }

  storeUser(user?: UserModel) {
    Store.USER = user;
    this.localStorageService.set('USER', JSON.stringify(user));
  }

  getAccessToken() {
    //return Store.AUTH_TOKEN;
    return this.localStorageService.get('AUTH_TOKEN') || '';
  }

  getRefreshToken() {
    //return Store.REFRESH_TOKEN;
    return this.localStorageService.get('REFRESH_TOKEN');
  }

  getUSer() {
    //return Store.USER;
    let user = this.localStorageService.get('USER');
    if (user !== null && user !== undefined) {
      return JSON.parse(user) as UserModel;
    }
    return null;
  }

  clearAuthData() {
    this.storeToken('');
    this.storeRefreshToken('');
  }

  clearUserData() {
    //Store.USER = undefined;
    this.localStorageService.remove('USER');
  }
}
