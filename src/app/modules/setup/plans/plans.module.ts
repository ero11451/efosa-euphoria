import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { PlanProvidersComponent } from './plan-providers/plan-providers.component';
import { PlanBenefitsComponent } from './plan-benefits/plan-benefits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NxDropdownModule } from 'src/app/directives/nx-dropdown/nx-dropdown.module';
import { ProviderSearchComponent } from './provider-search/provider-search.component';
import { PlanPreviewComponent } from './plan-preview/plan-preview.component';
import { PlanbenefitComponent } from './plan-preview/planbenefit/planbenefit.component';
import { PlanproviderComponent } from './plan-preview/planprovider/planprovider.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    PlanbenefitComponent,
    AllPlansComponent,
    CreatePlanComponent,
    PlanProvidersComponent,
    PlanBenefitsComponent,
    ProviderSearchComponent,
    PlanPreviewComponent,
    PlanbenefitComponent,
  
    PlanproviderComponent
  ],
  exports: [
    FormsModule
  ],
  imports: [
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PlansRoutingModule,
    NxDropdownModule]
})
export class PlansModule { }
