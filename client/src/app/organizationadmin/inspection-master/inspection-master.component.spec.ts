import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionMasterComponent } from './inspection-master.component';

describe('InspectionMasterComponent', () => {
  let component: InspectionMasterComponent;
  let fixture: ComponentFixture<InspectionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
