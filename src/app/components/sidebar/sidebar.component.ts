import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200)),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  menus: any[] = [];

  menuState!: string;

  constructor(public sidebarService: SidebarService, private router: Router) {
    this.listenForMenuChange();
    this.menus = sidebarService.getMenuList();
  }

  ngOnInit(): void {}

  listenForMenuChange() {
    this.sidebarService.OnMenuStateChange().subscribe((state) => {
      this.menuState = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
