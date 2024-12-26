import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog5Component } from './dialog5.component';

describe('Dialog5Component', () => {
  let component: Dialog5Component;
  let fixture: ComponentFixture<Dialog5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dialog5Component]
    });
    fixture = TestBed.createComponent(Dialog5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
