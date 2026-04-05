import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyPageComponent } from './supply-page.component';

describe('SupplyPageComponent', () => {
  let component: SupplyPageComponent;
  let fixture: ComponentFixture<SupplyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});