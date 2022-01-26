import { SelectBoxItemComponent } from './select-box-item/select-box-item.component';
import { SelectBoxComponent } from './select-box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SelectBoxComponent, SelectBoxItemComponent],
  imports: [CommonModule],
  exports: [SelectBoxComponent, SelectBoxItemComponent],
})
export class SelectBoxModule {}
