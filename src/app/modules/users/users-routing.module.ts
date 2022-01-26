import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'roles/:uid',
    component: ManageRolesComponent,
  },
  {
    path: 'roles',
    component: ManageRolesComponent,
  },
  {
    path: 'permissions/:uid',
    component: ManagePermissionsComponent,
  },
  {
    path: 'permissions',
    component: ManagePermissionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
