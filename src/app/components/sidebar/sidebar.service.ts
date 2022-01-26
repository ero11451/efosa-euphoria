import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menuStateChanged$ = new BehaviorSubject("expanded");

  menuState: 'collapsed' | 'expanded' = 'expanded';

  menus = [
    {
      title: 'general',
      type: 'header',
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'simple',
      badge: {
        text: 'New ',
        class: 'badge-warning',
      },
      route: '/dashboard',
    },
    {
      title: 'Tickets',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger',
      },
      submenus: [
        {
          title: 'All',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'simple',
          badge: {
            text: 'New ',
            class: 'badge-warning',
          },
          route: '/tickets/all',
        },
        {
          title: 'Open',
          route: '/tickets/open',
          active: false,
          type: 'simple',
        },
        {
          title: 'Assigned to me',
          route: '/tickets/assigned-to-me',
          active: false,
          type: 'simple',
        },
      ],
    },
    {
      title: 'Settings',
      type: 'header',
    },
    {
      title: 'Users',
      icon: 'fa fa-user',
      active: false,
      type: 'simple',
      route: '/users',
    },
    {
      title: 'Roles',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple',
      route: '/roles',
    },
    {
      title: 'Permissions',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple',
      route: '/permissions',
    },
    {
      title: 'Shifts',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple',
      route: '/shifts',
    },
    {
      title: 'Request Categories',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple',
      route: '/request-categories',
    },
    {
      title: 'Settings',
      icon: 'fa fa-cog ',
      active: false,
      type: 'simple',
      route: '/settings',
    },
  ];

  constructor() {}

  toggle() {
    if (this.menuState === 'collapsed') {
      this.menuState = 'expanded';
    } else {
      this.menuState = 'collapsed';
    }

    this.menuStateChanged$.next(this.menuState);
  }

  OnMenuStateChange() {
    return this.menuStateChanged$.asObservable();
  }

  getMenuList() {
    return this.menus;
  }
}
