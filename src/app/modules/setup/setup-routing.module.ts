import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NxDropdownModule } from 'src/app/directives/nx-dropdown/nx-dropdown.module';
import { BenefitCategoriesComponent } from './benefits/benefit-categories/benefit-categories.component';
import { BenefitsComponent } from './benefits/benefits/benefits.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: 'plans',
    loadChildren: () =>
      import('./plans/plans.module').then((m) => m.PlansModule),
  },
  {
    path: 'benefits',
    component: BenefitsComponent,
  }
  ,
  {
    path: 'benefits/categories',
    component: BenefitCategoriesComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NxDropdownModule],
exports: [RouterModule],
})
export class SetupRoutingModule {}
