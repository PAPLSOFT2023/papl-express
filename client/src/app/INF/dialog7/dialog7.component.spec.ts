import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog7Component } from './dialog7.component';

describe('Dialog7Component', () => {
  let component: Dialog7Component;
  let fixture: ComponentFixture<Dialog7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dialog7Component]
    });
    fixture = TestBed.createComponent(Dialog7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
