import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupBaristaPageComponent } from './logup-barista-page.component';

describe('LogupBaristaPageComponent', () => {
  let component: LogupBaristaPageComponent;
  let fixture: ComponentFixture<LogupBaristaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogupBaristaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogupBaristaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});