import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilingComponent } from './profiling/profiling.component';
import { TierUpgradeDowngradeComponent } from './tier-upgrade-downgrade/tier-upgrade-downgrade.component';
import { TariffComponent } from './tariff/tariff.component';
import { ProviderRequestComponent } from './provider-request/provider-request.component';
import { ProviderViewComponent } from './provider-view/provider-view.component';
import { FlaggingComponent } from './flagging/flagging.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path:'flagging',
    component:FlaggingComponent
  }
  ,
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'TierUpgradeDowngrade',
    component: TierUpgradeDowngradeComponent
  },
  {
    path:'provider-request',
    component:ProviderRequestComponent
  },
  {
   path:'view-provider',
   component:ProviderViewComponent
  },
  {
    path:'Tariff',
    component:TariffComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ProvidersRoutingModule {}
