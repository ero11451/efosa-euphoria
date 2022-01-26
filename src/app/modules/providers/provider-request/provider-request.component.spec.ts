import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestComponent } from './provider-request.component';

describe('ProviderRequestComponent', () => {
  let component: ProviderRequestComponent;
  let fixture: ComponentFixture<ProviderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
