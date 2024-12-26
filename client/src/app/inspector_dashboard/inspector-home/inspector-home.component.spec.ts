import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorHomeComponent } from './inspector-home.component';

describe('InspectorHomeComponent', () => {
  let component: InspectorHomeComponent;
  let fixture: ComponentFixture<InspectorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
