import { transition, trigger, useAnimation } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  fadeIn,
  fadeOut,
  popIn,
  popOut,
} from 'src/app/animations/custom.animations';
import { InsertionDirective } from './insertion.directive';
import { LoaderRef } from './loader-ref';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [useAnimation(fadeIn)]),
      transition(':leave', [useAnimation(fadeOut)]),
    ]),
    trigger('dialogAnimation', [
      transition('* => center', [useAnimation(popIn)]),
      transition('center => *', [useAnimation(popOut)]),
    ]),
  ],
})
export class LoaderComponent implements AfterViewInit, OnDestroy {
  public componentRef!: ComponentRef<any>;
  public childComponentType!: Type<any>;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  @ViewChild(InsertionDirective) insertionPoint!: InsertionDirective;

  @Input() backdropDismiss: boolean | undefined = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private loaderRef: LoaderRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(evt: any) {
    if (this.backdropDismiss) {
      this.loaderRef.close();
    }
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
