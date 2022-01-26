import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertResponse } from 'src/app/interfaces/AlertResponse';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() mode = 'success'; // 'success' | 'error' | 'info' | 'warn' = 'success';
  @Input() title = 'Notification!';
  @Input() message = '';
  @Input() buttonStye: 'row' | 'column' = 'row';
  @Input() buttons = [];
  @Input() buttonText = 'Ok';

  public OnClicked: EventEmitter<any> = new EventEmitter();

  constructor(public modalRef: BsModalRef) {}

  ngOnInit(): void {}

  triggerEvent(data: AlertResponse) {
    this.OnClicked.emit(data);
  }

  buttonClicked() {
    this.modalRef.hide();

    this.triggerEvent({
      data: 'Ok',
      buttonClicked: this.buttonText.toLowerCase().replace(/ /g, '-'),
      buttonIndex: 0,
    });
  }
}
