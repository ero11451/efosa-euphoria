import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantdetailsComponent } from './dependantdetails.component';

describe('DependantdetailsComponent', () => {
  let component: DependantdetailsComponent;
  let fixture: ComponentFixture<DependantdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependantdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
