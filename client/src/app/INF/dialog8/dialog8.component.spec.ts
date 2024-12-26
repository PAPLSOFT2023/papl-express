import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog8Component } from './dialog8.component';

describe('Dialog8Component', () => {
  let component: Dialog8Component;
  let fixture: ComponentFixture<Dialog8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dialog8Component]
    });
    fixture = TestBed.createComponent(Dialog8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
