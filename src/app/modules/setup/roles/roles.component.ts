import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Result } from 'src/app/interfaces/result';
import { RoleModel } from 'src/app/interfaces/roleModel';
import { RoleService } from 'src/app/services/role.service';
import { Helper } from 'src/app/utilities/helpers';
import { NotificationController } from './../../../utilities/notification.controller';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roles!: RoleModel[];
  role!: RoleModel;

  roleForm!: FormGroup;
  modalRef!: BsModalRef;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notify: NotificationController,
    private helper: Helper,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
  }

  initForm() {
    this.roleForm = this.fb.group({
      uid: [null],
      name: [null, Validators.compose([Validators.required])],
      description: [null],
    });
  }

  async getRoles() {
    console.log('get roles');
    await this.notify.showLoader('');
    this.roleService.getRoles().subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      if (res.success) {
        this.roles = res.content;
      } else {
        this.notify.showMessage(res.message);
      }
    });
  }

  async addRole() {
    if (!this.roleForm.valid) {
      Object.keys(this.roleForm.controls).forEach((field) => {
        const control = this.roleForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
        return;
      });

      return;
    }

    this.role = Object.assign({}, this.roleForm.value);

    console.log(this.role);
    await this.notify.showLoader('');
    this.roleService.createRole(this.role).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        this.roles.push(res.content);
      } else {
        this.notify.showMessage(res.message);
      }
    });
  }

  editRole(role: RoleModel) {
    this.roleForm.patchValue({ uid: role.uid });
    this.roleForm.patchValue({ name: role.name });
    this.roleForm.patchValue({ description: role.description });
    this.role = role;
    this.isEdit = true;
  }

  async updateRole() {
    if (!this.roleForm.valid) {
      Object.keys(this.roleForm.controls).forEach((field) => {
        const control = this.roleForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
        return;
      });

      return;
    }

    console.log(this.roleForm.value);

    await this.notify.showLoader('');
    this.roleService.updateRole(this.roleForm.value).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        let dd = this.roles.filter((role) => {
          return role.uid == this.role.uid;
        });
        if (dd) {
          dd = Object.assign(this.role, this.roleForm.value);
          this.roleForm.reset();
          this.isEdit = false;
        }
      } else {
        this.notify.showMessage(res.message);
      }
    });
  }

  async deleteRole(role: RoleModel) {
    await this.notify.showLoader('');
    this.roleService.deleteRole(role.uid).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      if (res.success) {
        this.helper.removeFromArray(this.roles, role);
      } else {
        this.notify.showMessage(res.message);
      }
    });
  }

  viewRoleUsers(role: RoleModel) {
    const initialState = {
      role: role,
    };
/*     this.modalRef = this.modalService.show(RoleUsersComponent, {
      initialState,
      class: 'modal-lg',
    });
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.event.subscribe((res: ExportModel) => {
      console.log(res);
      if (res.success) {
      } else {
        console.log('Show alert something went wrong');
      }
    }); */
  }

  managePermissions(role: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        role: role,
      },
    };

    this.router.navigate([`roles/${role.uid}/permissions`], navigationExtras);
  }
}
