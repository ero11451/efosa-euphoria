import { Directive, HostListener } from '@angular/core';
import { NavigationController } from '../utilities/navigation.controller';

@Directive({
  selector: '[backButton]',
})
export class BackButtonDirective {
  constructor(private navController: NavigationController) {}

  @HostListener('click')
  onClick(): void {
    this.navController.back();
  }
}
