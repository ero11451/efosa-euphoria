import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanproviderComponent } from './planprovider.component';

describe('PlanproviderComponent', () => {
  let component: PlanproviderComponent;
  let fixture: ComponentFixture<PlanproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanproviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
