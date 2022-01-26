import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsePanelComponent } from './collapse-panel.component';
import { CollapseHeadComponent } from './collapse-head/collapse-head.component';
import { CollapseBodyComponent } from './collapse-body/collapse-body.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    CollapsePanelComponent,
    CollapseHeadComponent,
    CollapseBodyComponent,
  ],
  imports: [CommonModule, CollapseModule.forRoot()],
  exports: [
    CollapsePanelComponent,
    CollapseHeadComponent,
    CollapseBodyComponent,
  ],
})
export class CollapsePanelModule {}
