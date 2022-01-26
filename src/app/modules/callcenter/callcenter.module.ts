import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EligibilitycheckComponent } from './eligibilitycheck/eligibilitycheck.component';
import { PacodeComponent } from './pacode/pacode.component';
import { Routes, RouterModule } from '@angular/router';
import { LimittypeComponent } from '../../limittype/limittype.component';
import { DependentdetailComponent } from './dependentdetail/dependentdetail.component';
const routes: Routes = [
  { path: '', component: EligibilitycheckComponent },
  { path: 'eligibilitycheck', component: EligibilitycheckComponent },
  { path: 'pacode', component: PacodeComponent },
  { path: '**', component: EligibilitycheckComponent },
];

@NgModule({
  declarations: [
    LimittypeComponent,
    DependentdetailComponent,
    EligibilitycheckComponent,
    PacodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CallcenterModule { }



