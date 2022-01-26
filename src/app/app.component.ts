import { ChangeDetectorRef, Component } from '@angular/core';
import 'boxicons';
import { IdleService } from './services/idle.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SessionTimeoutNotificationComponent } from './components/session-timeout-notification/session-timeout-notification.component';
import { IdleState } from './enums/IdleState.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Euphoria-Web';

  modalRef!: BsModalRef;

  // add parameters for Idle and Keepalive (if using) so Angular will inject them from the module
  constructor(
    private cd: ChangeDetectorRef,
    private idleService: IdleService,
    private router: Router,
    private modalService: BsModalService,
    private authService: AuthService
  ) {}

  ListenForIdleState() {
    this.idleService.OnIdleStatusChange().subscribe((state) => {
      if (state === IdleState.Idle) {
        this.openTimeOutModal();
      }
      if (state === IdleState.NotIdle) {
        this.closeTimeOutModal();
        this.cd.detectChanges();
      }
      if (state === IdleState.TimedOut) {
        console.log('time out - app component');
        this.closeTimeOutModal();
        this.cd.detectChanges();
        this.showTimeOutPage();
      }
    });
  }

  ListenForAuthState() {
    this.authService.OnAuthStatusChange().subscribe((state) => {
      if (!state) {
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit(): void {
    this.ListenForIdleState();
    this.ListenForAuthState();
  }

  showTimeOutPage() {
    this.router.navigate(['/time-out']);
  }

  closeTimeOutModal() {
    this.modalRef.hide();
  }

  openTimeOutModal() {
    this.modalRef = this.modalService.show(SessionTimeoutNotificationComponent);
    this.modalRef.content?.event?.subscribe((res: any) => {
      console.log(res);
    });
  }
}
