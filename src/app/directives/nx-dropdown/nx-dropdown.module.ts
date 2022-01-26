import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxDropdownDirective } from './nx-dropdown.directive';

@NgModule({
  declarations: [NxDropdownDirective],
  imports: [CommonModule],
  exports: [NxDropdownDirective],
})
export class NxDropdownModule {}
