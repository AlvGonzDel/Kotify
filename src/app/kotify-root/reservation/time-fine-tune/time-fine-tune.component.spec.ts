import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeFineTuneComponent } from './time-fine-tune.component';

describe('TimeFineTuneComponent', () => {
  let component: TimeFineTuneComponent;
  let fixture: ComponentFixture<TimeFineTuneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TimeFineTuneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeFineTuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
