import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownPanelComponent } from './dropdown-panel/dropdown-panel.component';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownItemComponent,
    DropdownPanelComponent,
  ],
  imports: [CommonModule, BsDropdownModule.forRoot()],
  exports: [DropdownComponent, DropdownItemComponent, DropdownPanelComponent],
})
export class DropdownModule {}
