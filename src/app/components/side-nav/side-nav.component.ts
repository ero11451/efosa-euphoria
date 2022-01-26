import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { SideNavService } from './side-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  menus: any[] = [];

  menuState!: string;

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
/*     console.log('outside clicked'); */
    if (!targetElement) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeAllOpenMenu();
      this.clickOutside.emit(event);
    }
  }

  constructor(
    private sideNavService: SideNavService,
    private router: Router,
    private _elementRef: ElementRef
  ) {
    this.listenForMenuChange();
    this.menus = sideNavService.getMenuList();
  }

  ngOnInit(): void {}

  listenForMenuChange() {
    this.sideNavService.OnMenuStateChange().subscribe((state) => {
      this.menuState = state;
    });
  }

  toggleSidebar() {
    this.sideNavService.toggle();
  }

  closeAllOpenMenu() {
    let cMenu = this.menus.filter((elem) => {
      return elem.showSubMenu === true;
    })[0];

    if (cMenu) {
      cMenu.active = false;
      cMenu.showSubMenu = false;
    }
  }

  ItemClick(menu: any) {
    this.menus.forEach((element) => {
      if (menu.title != element.title) {
        element.active = false;
        element.showSubMenu = false;
      }
    });

    if (menu.type === 'parent') {
      let cMenu = this.menus.filter((elem) => {
        return elem.title === menu.title;
      })[0];

      if (cMenu) {
        menu.active = !menu.active;
        menu.showSubMenu = menu.active;
      }

      this.sideNavService.pushSubMenus(menu.subMenus);
    } else {
      this.router.navigate([menu.route]);
      menu.active = true;
      this.sideNavService.pushSubMenus(undefined);
    }
  }

  SubItemClick(menu: any) {
    if (menu.type === 'parent') {
      let cMenu = this.menus.filter((elem) => {
        return elem.title === menu.title;
      })[0];

      if (cMenu) {
        menu.active = !menu.active;
        menu.showSubMenu = menu.active;
      }

      this.sideNavService.pushSubMenus(menu.subMenus);
    } else {
      this.router.navigate([menu.route]);
      menu.active = true;
      this.sideNavService.pushSubMenus(undefined);
    }
  }
}
