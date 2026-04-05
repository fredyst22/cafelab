import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupBaristaSuccessPageComponent } from './logup-barista-success-page.component';

describe('LogupBaristaSuccessPageComponent', () => {
  let component: LogupBaristaSuccessPageComponent;
  let fixture: ComponentFixture<LogupBaristaSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogupBaristaSuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogupBaristaSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});