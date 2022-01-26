import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimittypeComponent } from './limittype.component';

describe('LimittypeComponent', () => {
  let component: LimittypeComponent;
  let fixture: ComponentFixture<LimittypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimittypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimittypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
