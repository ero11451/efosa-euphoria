import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

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
