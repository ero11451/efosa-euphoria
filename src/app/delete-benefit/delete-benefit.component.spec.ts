import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBenefitComponent } from './delete-benefit.component';

describe('DeleteBenefitComponent', () => {
  let component: DeleteBenefitComponent;
  let fixture: ComponentFixture<DeleteBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
