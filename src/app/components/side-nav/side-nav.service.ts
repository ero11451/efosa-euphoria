import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { menuItem } from 'src/app/interfaces/menuItem';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  menuStateChanged$ = new BehaviorSubject('expanded');
  navigationChanged$ = new BehaviorSubject(undefined);

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

  menus2: menuItem[] = [
    {
      title: 'Dashboard',
      icon: 'bx bxs-dashboard',
      active: false,
      type: 'link',
      route: '/providers/dashboard',
    },
    {
      title: 'Plans',
      icon: 'bx bx-list-ul',
      active: false,
      type: 'parent',
      showSubMenu: false,
      subMenus: [
        {
          title: 'All plans',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/setup/plans',
        },
        {
          title: 'Create plans',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/setup/plans/create',
        },
        //  {
        //   title: 'add benefits',
        //   icon: 'fa fa-tachometer-alt',
        //   active: false,
        //   type: 'link',
        //   route: '/setup/plans/benefits/9022596D-1F42-4CAB-B46C-D64B9C6BA91A',
        // },
        // {
        //   title: 'Plan priview',
        //   icon: 'fa fa-tachometer-alt',
        //   active: false,
        //   type: 'link',
        //   route: '/setup/plans/priview/9022596D-1F42-4CAB-B46C-D64B9C6BA91A',
        // }
        // setup/plans/benefits/9022596D-1F42-4CAB-B46C-D64B9C6BA91A
      ],
    },
    {
      title: 'Benefits',
      icon: 'bx bx-customize',
      active: false,
      type: 'parent',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Benefit Category',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/setup/benefits/categories',
        },
        {
          title: 'Benefit Management',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/setup/benefits',
        }
      ],
    },
    {
      title: 'Users',
      icon: 'bx bxs-user-account',
      active: false,
      type: 'parent',
      showSubMenu: false,
      subMenus: [
        {
          title: 'All users',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/users',
        },
        {
          title: 'Create users',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/users/create',
        },
        {
          title: 'Manage roles',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/users/roles',
        },
        {
          title: 'Manage permissions',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: '/users/permissions',
        }
      ],
    },
    {
      title: 'Enrollment',
      icon: 'bx bx-user-plus',
      active: false,
      type: 'parent',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Retail',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'parent',
          showSubMenu: false,
          subMenus: [
            {
              title: 'Element 1',
              route: '/providers',
              active: false,
              type: 'link',
            },
            {
              title: 'Element 2',
              route: '',
              active: false,
              type: 'link',
            },
            {
              title: 'Element 3',
              route: '',
              active: false,
              type: 'link',
            },
          ]
        },
        {
          title: 'Corporate',
          route: '',
          active: false,
          type: 'link',
        },
      ],
    },
    {
      title: 'Underwriting',
      icon: 'bx bx-poll',
      active: false,
      type: 'link',
      route: '/corporate/dashboard',
    },
    {
      title: 'Call center',
      icon: 'bx bxs-briefcase-alt-2',
      active: false,
      type: 'parent',
      route: '',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Eligibility Check',
          route: '/callcenter/eligibilitycheck',
          active: false,
          type: 'link',
        },
        {
          title: 'PA Code ',
          route: '/callcenter/pacode',
          active: false,
          type: 'link',
        }
      ],
    },
    {
      title: 'Case Management',
      icon: 'bx bx-briefcase-alt-2',
      active: false,
      type: 'link',
      route: '',
    },
    {
      title: 'Settlement',
      icon: 'bx bx-credit-card',
      active: false,
      type: 'link',
      route: '',
    },
    {
      title: 'Provider Management',
      icon: 'bx bxs-briefcase-alt-2',
      active: false,
      type: 'parent',
      route: '',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Tier Upgrade/Downgrade',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: 'provider/TierUpgradeDowngrade',
        },
        {
          title: 'Tariff',
          active: false,
          type: 'link',
          route: 'provider/Tariff',
        },
        {
          title: 'flagging',
          route: 'provider/flagging',
          active: false,
          type: 'link',
        },
        {
          title: 'Provider request',
          route: 'provider/provider-request',
          active: false,
          type: 'link',
        },
        {
          title: 'View provider',
          route: 'provider/view-provider',
          active: false,
          type: 'link',
        },
      ],
    },
  
    {
      title:'Pharmacy Benefit',
      icon: 'bx bx-network-chart',
      active: false,
      type: 'parent',
      route: '',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Dispensing',
          icon: 'fa fa-tachometer-alt',
          active: false,
          type: 'link',
          route: 'PharmacyBenefit/Dispensing',
        },
        {
          title: 'Drug Inventory',
          active: false,
          type: 'link',
          route: 'PharmacyBenefit/DrugsInventory',
        },
        {
          title: 'Pharmacy request',
          route: 'PharmacyBenefit/Pharmacyrequest',
          active: false,
          type: 'link',
        },
       ]
    },
    {
      title: 'Policy Booking',
      icon: 'bx bx-book-add',
      active: false,
      type: 'link',
      route: '',
    },
    {
      title: 'Setup',
      icon: 'bx bx-cog',
      active: false,
      type: 'parent',
      route: '',
      showSubMenu: false,
      subMenus: [
        {
          title: 'Roles',
          icon: 'bx bxs-user-badge',
          active: false,
          type: 'link',
          route: 'setup/roles',
        },
      ]
    },
  ];

  subMenus = [];

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

  OnNavigationChange() {
    return this.navigationChanged$.asObservable();
  }

  getMenuList() {
    return this.menus2;
  }

  getSubMenuList() {
    return this.subMenus;
  }

  pushSubMenus(menus: any) {
    this.subMenus = menus;
    this.navigationChanged$.next(menus);
  }
}
