import { SelectBoxService } from './../select-box.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '../select-box.options';

@Component({
  selector: 'select-item',
  templateUrl: './select-box-item.component.html',
  styleUrls: ['./select-box-item.component.scss'],
})
export class SelectBoxItemComponent implements OnInit {
  @Input() text: string = '';
  @Input() value: any;
  @Input() icon!: string;
  @Input() image!: string;
  @Input() subText!: string;

  @Input() type: 'default' | 'template' = 'default';

  constructor(private selectBoxService: SelectBoxService) {}

  ngOnInit(): void {}

  itemSelected() {
    console.log('Item selected: ' + this.text);
    if (this.value) {
      let option: SelectOption = {
        icon: this.icon,
        image: this.image,
        subText: this.subText,
        text: this.text,
        value: this.value,
      };
      this.selectBoxService.itemSelected(option);
    } else {
      this.selectBoxService.itemSelected(null);
    }
  }
}
