import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeworganizationComponent } from './neworganization.component';

describe('NeworganizationComponent', () => {
  let component: NeworganizationComponent;
  let fixture: ComponentFixture<NeworganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeworganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeworganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
