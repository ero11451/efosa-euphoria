import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/result';
import { UserService } from './../../../services/user.service';
import { NotificationController } from './../../../utilities/notification.controller';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  username: string = '';
  title!: string;
  roles!: any;

  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private notify: NotificationController,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      telephoneNo: ['', Validators.compose([Validators.required])],
      unit: ['', Validators.compose([Validators.required])],
      group: [''],
      division: [''],
    });
  }

  async fetchUser() {
    let username = this.userForm.controls.username.value;
    if (username?.trim() === '' || username === null || username === undefined) {
      //show list of users dialogue to select from
   /*    let user = {
        username: 'eidemudia',
        firstname: 'Efosa',
        lastname: 'Idemudia',
        email: 'efosa.idemudia@axamansard.com',
        telephoneNo: '08099887722',
        unit: 'N/A',
        group: 'Business Solutions',
        division: 'Technology',
      };

      this.userForm.patchValue(user); */
    } else {
      return this.getUser(this.userForm.controls.username.value);
    }
  }

  async getUser(username: string) {
    this.notify.showLoader('');
    this.userService.getUserFromAD(username).subscribe((res) => {
      this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        this.userForm.patchValue(res.content);
      } else {
        this.notify.showErrorMessage(res.message);
      }
    });
  }

  async AddUser() {
    if (!this.userForm.valid) {
      Object.keys(this.userForm.controls).forEach((field) => {
        const control = this.userForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
        return;
      });

      return;
    }

    //either this
    let param = Object.assign({}, this.userForm.value);

    //or this
    let controls = this.userForm.controls;
    let params = {
      username: controls.username.value,
      firstName: controls.firstname.value,
      lastName: controls.lastname.value,
      email: controls.email.value,
      phoneNumber: controls.telephoneNo.value,
      unit: controls.unit.value,
      group: controls.group.value,
      division: controls.division.value,
    };

    console.log(param);
    console.log(params);

    await this.notify.showLoader('');
    this.userService.createUser(param).subscribe(async (res: Result) => {
      await this.notify.hideLoader();
      console.log(res);
      if (res.success) {
        this.notify.showMessage(res.message);
        this.router.navigate([`users/roles/${res.content}`]);
        //this.userForm.reset();
      } else {
        this.notify.showErrorMessage('Something went wrong!', res.message);
      }
    });
  }
}
