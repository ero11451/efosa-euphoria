import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoaderRef } from '../components/loader/loader-ref';
import { LoaderService } from '../components/loader/loader.service';
import { AlertComponent } from './../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationController {
  loader!: LoaderRef;
  modalRef!: BsModalRef;

  constructor(
    private loaderService: LoaderService,
    private modalService: BsModalService
  ) {}

  async showLoader(message: string, parent: string = '') {
    if (this.loader) {
      this.loader.close();
    }
    this.loader = await this.loaderService.show(message, parent);
  }

  async hideLoader() {
    if (this.loader) {
      await this.loaderService.close(this.loader);
    }
  }

  updateLoader(message: string) {
    if (this.loader) {
      this.loader.update({ message: message });
    }
  }

  showMessage(message: string | undefined) {
    const initialState = {
      mode: 'success',
      title: 'Notification!',
      message: message,
      buttonText: 'Ok',
    };

    this.modalRef = this.modalService.show(AlertComponent, {
      class: 'modal-dialog-centered modal-dialog-zoom alert-modal',
      initialState,
    });
    this.modalRef.content.OnClicked.subscribe((res: any) => {
      console.log(res);
    });
  }

  showErrorMessage(title?: string, message?: string) {
    const initialState = {
      mode: 'error',
      title: title,
      message: message,
      buttonText: 'Ok',
    };

    this.modalRef = this.modalService.show(AlertComponent, {
      class: 'modal-dialog-centered modal-dialog-zoom alert-modal',
      initialState,
    });
    this.modalRef.content.OnClicked.subscribe((res: any) => {
      console.log(res);
    });
  }

}
