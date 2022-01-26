import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeOutComponent } from './time-out/time-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'time-out',
    component: TimeOutComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [TimeOutComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
