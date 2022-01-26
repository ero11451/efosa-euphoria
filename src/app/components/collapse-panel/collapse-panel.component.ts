import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
})
export class CollapsePanelComponent implements OnInit {
  isOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggle(collapse: any) {
    this.isOpen = !this.isOpen;
  }
}
