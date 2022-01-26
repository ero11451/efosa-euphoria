import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierUpgradeDowngradeComponent } from './tier-upgrade-downgrade.component';

describe('TierUpgradeDowngradeComponent', () => {
  let component: TierUpgradeDowngradeComponent;
  let fixture: ComponentFixture<TierUpgradeDowngradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TierUpgradeDowngradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TierUpgradeDowngradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
