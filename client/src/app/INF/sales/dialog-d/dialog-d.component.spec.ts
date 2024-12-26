import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDComponent } from './dialog-d.component';

describe('DialogDComponent', () => {
  let component: DialogDComponent;
  let fixture: ComponentFixture<DialogDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
