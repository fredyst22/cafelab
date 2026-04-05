import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupOwnerPageComponent } from './logup-owner-page.component';

describe('LogupOwnerPageComponent', () => {
  let component: LogupOwnerPageComponent;
  let fixture: ComponentFixture<LogupOwnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogupOwnerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogupOwnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});