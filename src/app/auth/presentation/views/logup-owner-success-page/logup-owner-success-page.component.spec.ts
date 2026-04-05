import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupOwnerSuccessPageComponent } from './logup-owner-success-page.component';

describe('LogupOwnerSuccessPageComponent', () => {
  let component: LogupOwnerSuccessPageComponent;
  let fixture: ComponentFixture<LogupOwnerSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogupOwnerSuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogupOwnerSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});