import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPComponent } from './dialog-p.component';

describe('DialogPComponent', () => {
  let component: DialogPComponent;
  let fixture: ComponentFixture<DialogPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPComponent]
    });
    fixture = TestBed.createComponent(DialogPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
