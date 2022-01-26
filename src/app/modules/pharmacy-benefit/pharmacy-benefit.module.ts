import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispensingComponent } from './dispensing/dispensing.component';
import { DrugsInventoryComponent } from './drugs-inventory/drugs-inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyRequestComponent } from 'src/app/modules/pharmacy-benefit/pharmacy-request/pharmacy-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreatedrugComponent } from './createdrug/createdrug.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path:'Dispensing',
    component:DispensingComponent
  },
  {
    path:'DrugsInventory',
    component:DrugsInventoryComponent
  },
  {
    path:'Pharmacyrequest',
    component:PharmacyRequestComponent
  }
];


@NgModule({
  declarations: [
    CreatedrugComponent,
    PharmacyRequestComponent,
    DrugsInventoryComponent,
    DispensingComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PharmacyBenefitModule { }
