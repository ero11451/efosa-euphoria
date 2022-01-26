import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentdetailComponent } from './dependentdetail.component';

describe('DependentdetailComponent', () => {
  let component: DependentdetailComponent;
  let fixture: ComponentFixture<DependentdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
