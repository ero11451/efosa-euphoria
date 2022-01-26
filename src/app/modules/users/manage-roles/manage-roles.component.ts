import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationController } from './../../../utilities/notification.controller';
import { NavigationController } from './../../../utilities/navigation.controller';
import { Result } from 'src/app/interfaces/result';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  user!: any;
  roles!: any[];
  userRole!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationController,
    private userService: UserService,
    private navigationService: NavigationController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
      }
    });
  }

  ngOnInit(): void {
    if (!this.user) {
      //this.navigationService.back();
    }

    this.getRoleMatrix();
  }

  async getRoleMatrix() {
    await this.notify.showLoader('');
    this.userService
      .getRoleMatrix(this.user?.uid)
      .subscribe(async (res: Result) => {
        await this.notify.hideLoader();
        if (res.success) {
          this.userRole = res.content;
          console.log(this.userRole);
        } else {
          this.notify.showMessage(res.message);
        }
      });
  }

  async saveRoles() {
    console.log(this.userRole);
    await this.notify.showLoader('');
    this.userService
      .saveUserRole(this.user?.uid, this.userRole)
      .subscribe(async (res: Result) => {
        await this.notify.hideLoader();
        if (res.success) {
          this.notify.showMessage(res.message);
        } else {
          this.notify.showMessage(res.message);
        }
      });
  }
}
