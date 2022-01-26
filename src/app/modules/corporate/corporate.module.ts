import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CorporateRoutingModule } from './corporate-routing.module';
import { NxDropdownModule } from 'src/app/directives/nx-dropdown/nx-dropdown.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CorporateRoutingModule, NxDropdownModule],
})
export class CorporateModule {}
