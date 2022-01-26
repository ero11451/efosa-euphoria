import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  //private cookieStore = {};
  private store = new Map();

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    //this.cookieStore = {};
    this.store.clear();

    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      //this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
      this.store.set(cookieArr[0].trim(), cookieArr[1]);
    }
  }

  get(key: string) {
    this.parseCookies();
    return !!this.store.get(key) ? this.store.get(key) : null;
    //return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  remove(key: string) {
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string) {
    document.cookie = key + '=' + (value || '');
  }
}
