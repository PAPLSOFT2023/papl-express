import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfBuildingComponent } from './type-of-building.component';

describe('TypeOfBuildingComponent', () => {
  let component: TypeOfBuildingComponent;
  let fixture: ComponentFixture<TypeOfBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfBuildingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
