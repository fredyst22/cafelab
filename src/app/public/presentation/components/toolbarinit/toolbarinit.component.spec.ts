import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarinitComponent } from './toolbarinit.component';

describe('ToolbarinitComponent', () => {
  let component: ToolbarinitComponent;
  let fixture: ComponentFixture<ToolbarinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarinitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});