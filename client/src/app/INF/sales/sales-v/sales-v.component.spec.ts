import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVComponent } from './sales-v.component';

describe('SalesVComponent', () => {
  let component: SalesVComponent;
  let fixture: ComponentFixture<SalesVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesVComponent]
    });
    fixture = TestBed.createComponent(SalesVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
