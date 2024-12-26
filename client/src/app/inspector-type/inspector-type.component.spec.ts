import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorTypeComponent } from './inspector-type.component';

describe('InspectorTypeComponent', () => {
  let component: InspectorTypeComponent;
  let fixture: ComponentFixture<InspectorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
