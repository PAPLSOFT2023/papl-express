import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorCvComponent } from './inspector-cv.component';

describe('InspectorCvComponent', () => {
  let component: InspectorCvComponent;
  let fixture: ComponentFixture<InspectorCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
