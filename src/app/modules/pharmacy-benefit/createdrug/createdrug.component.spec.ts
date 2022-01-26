import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedrugComponent } from './createdrug.component';

describe('CreatedrugComponent', () => {
  let component: CreatedrugComponent;
  let fixture: ComponentFixture<CreatedrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
