import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimittypesComponent } from './limittypes.component';

describe('LimittypesComponent', () => {
  let component: LimittypesComponent;
  let fixture: ComponentFixture<LimittypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimittypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimittypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
