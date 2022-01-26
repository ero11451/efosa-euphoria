import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { IdleState } from '../enums/IdleState.enum';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  private idleStatus = new BehaviorSubject<IdleState>(IdleState.NotStarted);
  private countDownStatus = new Subject<number>();

  idleState: IdleState = IdleState.NotStarted;
  countdown?: number;
  lastPing?: Date;

  idleTriggerPeriod: number = 300; //5 minutes
  timeOutPeriod: number = 30; //30 seconds

  router2Exclude: string[] = ['/login', '/time-out'];

  subscriptions: Subscription[] = [];

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router
  ) {
    this.Start();
  }

  showStart() {
    if (this.router2Exclude.some((v) => window.location.href.includes(v))) {
      return false;
    }

    return true;
  }

  OnIdleStatusChange() {
    return this.idleStatus.asObservable();
  }

  RaiseIdleStatusEvent(status: IdleState) {
    this.idleStatus.next(status);
  }

  OnCountDownStatusChange() {
    return this.countDownStatus.asObservable();
  }

  RaiseCountDownStatusEvent(status: number) {
    this.countDownStatus.next(status);
  }

  StopObserving() {
    this.idle.stop();
    this.idleState = IdleState.NotIdle;
    this.countdown = undefined;
    this.lastPing = undefined;
  }

  clearSubscriptions() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  Start() {
    if (this.showStart()) {
      this.clearSubscriptions();
      this.StartObserving();
      this.Reset();
    }
  }

  Reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = IdleState.NotIdle;
    this.countdown = undefined;
    this.lastPing = undefined;
  }

  StartObserving() {
    // set idle parameters
    this.idle.setIdle(this.idleTriggerPeriod); // how long can they be inactive before considered idle, in seconds
    this.idle.setTimeout(this.timeOutPeriod); // how long can they be idle before considered timed out, in seconds
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    this.subscriptions.push(
      this.idle.onIdleStart.subscribe(() => {
        this.idleState = IdleState.Idle;
        this.RaiseIdleStatusEvent(this.idleState);
      })
    );

    // do something when the user is no longer idle
    this.subscriptions.push(
      this.idle.onIdleEnd.subscribe(() => {
        this.idleState = IdleState.NotIdle;
        this.RaiseIdleStatusEvent(this.idleState);
        this.countdown = undefined;
      })
    );

    // do something when the user has timed out
    this.subscriptions.push(
      this.idle.onTimeout.subscribe(() => {
        this.idleState = IdleState.TimedOut;
        console.log('time out - idle service');
        this.RaiseIdleStatusEvent(IdleState.TimedOut);
      })
    );

    // do something as the timeout cou  ntdown does its thing
    this.subscriptions.push(
      this.idle.onTimeoutWarning.subscribe((seconds) => {
        this.countdown = seconds;
        this.RaiseCountDownStatusEvent(seconds);
      })
    );

    // set keepalive parameters, omit if not using keepalive
    this.keepalive.interval(15); // will ping at this interval while not idle, in seconds
    this.keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings
  }
}
