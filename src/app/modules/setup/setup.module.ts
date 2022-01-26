import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { BenefitsComponent } from './benefits/benefits/benefits.component';
import { BenefitCategoriesComponent } from './benefits/benefit-categories/benefit-categories.component';
import { RolesComponent } from './roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxDropdownModule } from 'src/app/directives/nx-dropdown/nx-dropdown.module';

@NgModule({
  declarations: [BenefitsComponent, BenefitCategoriesComponent, RolesComponent],
  imports: [
    FormsModule ,
    CommonModule, 
    ReactiveFormsModule,
    SetupRoutingModule, 
    NxDropdownModule
  ]
})
export class SetupModule {}
