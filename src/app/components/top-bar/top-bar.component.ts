import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  menuState!: string;

  constructor(public sidebarService: SidebarService) {
    this.listenForMenuChange();
   }

  ngOnInit(): void {
  }

  listenForMenuChange() {
    this.sidebarService.OnMenuStateChange().subscribe(state => {
      this.menuState = state;
    });
  }
}
