import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAbstractUnitsComponent } from './key-abstract-units.component';

describe('KeyAbstractUnitsComponent', () => {
  let component: KeyAbstractUnitsComponent;
  let fixture: ComponentFixture<KeyAbstractUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAbstractUnitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyAbstractUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
