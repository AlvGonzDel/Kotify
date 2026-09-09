import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartySizeComponent } from './party-size.component';

describe('PartySizeComponent', () => {
  let component: PartySizeComponent;
  let fixture: ComponentFixture<PartySizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PartySizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
