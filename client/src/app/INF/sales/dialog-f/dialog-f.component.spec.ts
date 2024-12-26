import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFComponent } from './dialog-f.component';

describe('DialogFComponent', () => {
  let component: DialogFComponent;
  let fixture: ComponentFixture<DialogFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
