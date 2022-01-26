import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'providers',
        loadChildren: () => import('../providers/providers.module').then(m => m.ProvidersModule),
      },
      {
        path: 'corporate',
        loadChildren: () => import('../corporate/corporate.module').then(m => m.CorporateModule)
      },
      {
        path: 'setup',
        loadChildren: () => import('../setup/setup.module').then(m => m.SetupModule)
      },
      {
        path: 'callcenter',
        loadChildren: () => import('../callcenter/callcenter.module').then(m => m.CallcenterModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'PharmacyBenefit',
        loadChildren: () =>
          import('../pharmacy-benefit/pharmacy-benefit.module').then((m) => m.PharmacyBenefitModule),
      },
      {
        path:'provider',
        loadChildren: () =>
          import('./../providers/providers.module').then((m) => m.ProvidersModule),
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
