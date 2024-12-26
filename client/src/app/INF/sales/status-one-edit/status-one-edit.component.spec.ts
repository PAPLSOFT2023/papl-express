import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOneEditComponent } from './status-one-edit.component';

describe('StatusOneEditComponent', () => {
  let component: StatusOneEditComponent;
  let fixture: ComponentFixture<StatusOneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOneEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusOneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
