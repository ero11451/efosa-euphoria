import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Result } from 'src/app/interfaces/result';
import { UserService } from './../../services/user.service';
import { NotificationController } from './../../utilities/notification.controller';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private notify: NotificationController
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    await this.notify.showLoader("");
    this.userService.getUsers().subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        this.users = res.content;
      } else {
        this.notify.showMessage(res.message);
      }
    });
  }

  openAddUser() {
    this.router.navigate([`users/create`]);
  }

  editUser(user: any) {
    //pop.hide();
    console.log(user);
  }

  removeUser(user: any) {
    console.log(user);
    //pop.hide();
  }

  manageRoles(user: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: user,
      },
    };

    this.router.navigate([`users/roles/${user.uid}`], navigationExtras);
  }

  managePermissions(user: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: user,
      },
    };

    this.router.navigate([`users/permissions/${user.uid}/`], navigationExtras);
  }
}
