import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCComponent } from './dialog-c.component';

describe('DialogCComponent', () => {
  let component: DialogCComponent;
  let fixture: ComponentFixture<DialogCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCComponent]
    });
    fixture = TestBed.createComponent(DialogCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
