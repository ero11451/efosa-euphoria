import { Component, OnInit } from '@angular/core';
import { IdleService } from 'src/app/services/idle.service';

@Component({
  selector: 'app-session-timeout-notification',
  templateUrl: './session-timeout-notification.component.html',
  styleUrls: ['./session-timeout-notification.component.scss'],
})
export class SessionTimeoutNotificationComponent implements OnInit {
  countDown?: number;
  percentCountDown?: number;

  constructor(private idleService: IdleService) {}

  ngOnInit(): void {
    this.ListenForTimeOutCountDown();
  }

  ListenForTimeOutCountDown() {
    this.idleService.OnCountDownStatusChange().subscribe((state) => {
      this.countDown = state;
      this.percentCountDown = (state/this.idleService.timeOutPeriod) * 100;
    });
  }
}
