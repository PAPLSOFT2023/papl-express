import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDateComponent } from './basic-date.component';

describe('BasicDateComponent', () => {
  let component: BasicDateComponent;
  let fixture: ComponentFixture<BasicDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
