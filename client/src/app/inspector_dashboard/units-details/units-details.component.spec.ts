import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsDetailsComponent } from './units-details.component';

describe('UnitsDetailsComponent', () => {
  let component: UnitsDetailsComponent;
  let fixture: ComponentFixture<UnitsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
