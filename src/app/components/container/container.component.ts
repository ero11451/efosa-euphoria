import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav/side-nav.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  menuState!: string;

  constructor(private sideNavService: SideNavService) {
    this.listenForMenuChange();
  }

  ngOnInit(): void {
  }

  listenForMenuChange() {
    this.sideNavService.OnMenuStateChange().subscribe((state) => {
      this.menuState = state;
    });
  }

}
