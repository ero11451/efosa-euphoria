import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[nx-dropdown]',
})
export class NxDropdownDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostBinding('class.show') isOpen = false;

  @HostListener('click')
  toggleOpen() {
    console.log('clicked');

    this.isOpen = !this.isOpen;
    let part = this.el.nativeElement.querySelector('.dropdown-content');

    if (this.isOpen) this.renderer.addClass(part, 'show');
    else this.renderer.removeClass(part, 'show');
  }
}
