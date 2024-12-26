import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningEngHomeComponent } from './planning-eng-home.component';

describe('PlanningEngHomeComponent', () => {
  let component: PlanningEngHomeComponent;
  let fixture: ComponentFixture<PlanningEngHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningEngHomeComponent]
    });
    fixture = TestBed.createComponent(PlanningEngHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
