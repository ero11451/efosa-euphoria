import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { SideNavService } from '../side-nav/side-nav.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  menuState!: string;
  menus: any | undefined = [];

  showProfileDetails: boolean = false;

  user?: UserModel | null;

  constructor(
    private sideNavService: SideNavService,
    private _elementRef: ElementRef,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.listenForMenuChange();
    this.ListenForAuthChange();
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    /*    console.log('outside clicked'); */
    if (!targetElement) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showProfileDetails = false;
    }
  }

  ngOnInit(): void {}

  ListenForAuthChange() {
    this.authService.OnAuthStatusChange().subscribe((state) => {
      if (state) {
        this.user = this.storageService.getUSer();
      } else {
        this.user = undefined;
      }
    });
  }

  listenForMenuChange() {
    this.sideNavService.OnMenuStateChange().subscribe((state) => {
      this.menuState = state;
    });

    this.sideNavService.OnNavigationChange().subscribe((menus) => {
      this.menus = menus;
      console.log('sub menus');
      console.log(menus);
    });
  }

  toggleSidebar() {
    this.sideNavService.toggle();
  }

  profileClick() {
    this.showProfileDetails = !this.showProfileDetails;
  }

  async logout() {
    await this.authService.logUserOut();
  }
}
