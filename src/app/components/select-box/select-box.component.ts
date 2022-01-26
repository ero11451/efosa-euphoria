import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectBoxItemComponent } from './select-box-item/select-box-item.component';
import { SelectOption } from './select-box.options';
import { SelectBoxService } from './select-box.service';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  providers: [
    SelectBoxService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent implements OnInit {
  @ContentChildren(SelectBoxItemComponent)
  selectOptions!: QueryList<SelectBoxItemComponent>;

  options: SelectOption[] = [];
  selectedOption!: SelectOption;
  value = '';

  showItems: boolean;

  @Output() OnChange = new EventEmitter<any>();
  @Input() placeHolder = '';
  @Input() selectedValue = '';
  @Input() selectedText = '';

  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => {};

  //validateFn: Function;

  constructor(private selectBoxService: SelectBoxService) {
    this.showItems = false;
  }

  ngOnInit(): void {
    this.selectBoxService
      .OnItemSelected()
      .subscribe((option: SelectOption | null) => {
        if (option) {
          this.assignValue(option);
        } else {
          this.showItems = false;
        }
      });
  }

  toggleItems() {
    if (this.options.length > 0) {
      this.showItems = !this.showItems;
    }
  }

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.value = value;
      this.selectedValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }

  ngAfterViewInit() {
    this.populateOptions();

    this.selectOptions.changes.subscribe((options) => {
      this.populateOptions();
    });
  }

  populateOptions() {
    this.options = [];

    this.selectOptions.forEach((option) => {
      this.options.push({
        text: option.text,
        value: option.value,
        icon: option.icon,
        image: option.image,
        subText: option.subText,
      });
    });

    if (this.selectedValue !== undefined && this.selectedValue !== null) {
      let option = this.options.filter((sel: SelectOption) => {
        return sel.value == this.selectedValue;
      })[0];

      if (option) {
        this.assignValue(option);
      }
    }
  }

  assignValue(option: SelectOption) {
    this.selectedOption = option;
    this.value = option.value;

    this.showItems = false;

    this.propagateChange(this.value);
    this.OnChange.emit(option);
  }
}
