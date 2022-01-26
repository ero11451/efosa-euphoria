import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/interfaces/result';
import { UserService } from 'src/app/services/user.service';
import { NotificationController } from './../../../utilities/notification.controller';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  user!: any;
  permissions!: any[];
  userPermission!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationController,
    private userService: UserService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
      }
    });
  }

  ngOnInit(): void {
    this.getPermissionMatrix();
  }

  async getPermissionMatrix() {
    await this.notify.showLoader('');
    this.userService
      .getPermissionMatrix(this.user?.uid)
      .subscribe(async (res: Result) => {
        await this.notify.hideLoader();
        if (res.success) {
          this.userPermission = res.content;
          console.log(this.userPermission);
        } else {
          this.notify.showMessage(res.message);
        }
      });
  }

  async savePermissions(){
    console.log(this.userPermission);
    await this.notify.showLoader('');
    this.userService
      .saveUserPermission(this.user?.uid, this.userPermission)
      .subscribe(async (res: Result) => {
        await this.notify.hideLoader();
        if (res.success) {
          this.notify.showMessage(res.message);
        } else {
          this.notify.showErrorMessage("Oops!", res.message);
        }
      });
  }

}
