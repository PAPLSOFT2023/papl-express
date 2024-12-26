import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInspectorComponent } from './multiple-inspector.component';

describe('MultipleInspectorComponent', () => {
  let component: MultipleInspectorComponent;
  let fixture: ComponentFixture<MultipleInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleInspectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
