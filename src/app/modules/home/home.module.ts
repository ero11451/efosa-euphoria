import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { TopNavComponent } from 'src/app/components/top-nav/top-nav.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BackButtonDirective } from 'src/app/directives/back-button.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxDropdownModule } from 'src/app/directives/nx-dropdown/nx-dropdown.module';

@NgModule({
  declarations: [
    HomeComponent,
    SideNavComponent,
    TopNavComponent,
    ContainerComponent,
    BackButtonDirective,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    NxDropdownModule
  ],
})
export class HomeModule {}
