import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsInventoryComponent } from './drugs-inventory.component';

describe('DrugsInventoryComponent', () => {
  let component: DrugsInventoryComponent;
  let fixture: ComponentFixture<DrugsInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
