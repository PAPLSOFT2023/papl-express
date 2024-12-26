import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHomeComponent } from './sales-home.component';

describe('SalesHomeComponent', () => {
  let component: SalesHomeComponent;
  let fixture: ComponentFixture<SalesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesHomeComponent]
    });
    fixture = TestBed.createComponent(SalesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
