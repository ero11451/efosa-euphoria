import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersRoutingModule } from './providers-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilingComponent } from './profiling/profiling.component';
import { ProviderSearchComponent } from './provider-search/provider-search.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProviderRequestComponent } from './provider-request/provider-request.component';
import { TariffComponent } from './tariff/tariff.component';
import { TierUpgradeDowngradeComponent } from './tier-upgrade-downgrade/tier-upgrade-downgrade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProviderViewComponent } from './provider-view/provider-view.component';
import { FlaggingComponent } from './flagging/flagging.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfilingComponent,
    ProviderSearchComponent,
    ProviderRequestComponent,
    TariffComponent,
    ProviderViewComponent,
    FlaggingComponent,
    TierUpgradeDowngradeComponent
  ],
  exports: [ProviderSearchComponent],
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProvidersRoutingModule,
    BsDropdownModule.forRoot()
  ]
})
export class ProvidersModule { }
