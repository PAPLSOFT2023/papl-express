import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog4Component } from './dialog4.component';

describe('Dialog4Component', () => {
  let component: Dialog4Component;
  let fixture: ComponentFixture<Dialog4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dialog4Component]
    });
    fixture = TestBed.createComponent(Dialog4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
