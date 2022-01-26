import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { GlobalErrorHandler } from './utilities/global.error.handler';
import { Helper } from './utilities/helpers';
import { LoaderService } from './components/loader/loader.service';
import { PageNotFoundComponent } from './modules/errors/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ContentComponent } from './components/content/content.component';
import { CreateUserComponent } from './modules/users/create-user/create-user.component';
import { EditUserComponent } from './modules/users/edit-user/edit-user.component';
import { ManagePermissionsComponent } from './modules/users/manage-permissions/manage-permissions.component';
import { ManageRolesComponent } from './modules/users/manage-roles/manage-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DefaultComponent } from './modules/default/default.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SessionTimeoutNotificationComponent } from './components/session-timeout-notification/session-timeout-notification.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from './modules/auth/auth.module';
import { AlertComponent } from './components/alert/alert.component';
import { LocalStorageService } from './services/local.storage.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SidebarComponent,
    TopBarComponent,
    ContentComponent,
    CreateUserComponent,
    EditUserComponent,
    ManagePermissionsComponent,
    ManageRolesComponent,
    DefaultComponent,
    SessionTimeoutNotificationComponent,
    AlertComponent,
  ],
  imports: [
    RouterModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    BsDropdownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    LoaderService,
    Helper,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
