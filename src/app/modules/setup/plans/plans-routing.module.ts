import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { PlanBenefitsComponent } from './plan-benefits/plan-benefits.component';
import { PlanPreviewComponent } from './plan-preview/plan-preview.component';
import { PlanProvidersComponent } from './plan-providers/plan-providers.component';

const routes: Routes = [
  {
    path: '',
    component: AllPlansComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'create',
    component: CreatePlanComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'providers/:ref',
    component: PlanProvidersComponent,
  },
  {
    path: 'benefits/:ref',
    component: PlanBenefitsComponent,
  },
  {
    path: 'priview/:ref',
    component: PlanPreviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
