import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningEngInfComponent } from './planning-eng-inf.component';

describe('PlanningEngInfComponent', () => {
  let component: PlanningEngInfComponent;
  let fixture: ComponentFixture<PlanningEngInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningEngInfComponent]
    });
    fixture = TestBed.createComponent(PlanningEngInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
