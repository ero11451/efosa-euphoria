import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { PageNotFoundComponent } from './modules/errors/page-not-found/page-not-found.component';
import { ProfilingComponent } from './modules/providers/profiling/profiling.component';
import { TimeOutComponent } from './modules/auth/time-out/time-out.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    // component: LoginComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'time-out',
    component: TimeOutComponent,
  },

  {
    path: 'provider-profiling',
    component: ProfilingComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
