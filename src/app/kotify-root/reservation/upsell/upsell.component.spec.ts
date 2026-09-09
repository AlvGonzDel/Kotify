import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpsellComponent } from './upsell.component';

describe('UpsellComponent', () => {
  let component: UpsellComponent;
  let fixture: ComponentFixture<UpsellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UpsellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
