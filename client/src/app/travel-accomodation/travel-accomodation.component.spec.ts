import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAccomodationComponent } from './travel-accomodation.component';

describe('TravelAccomodationComponent', () => {
  let component: TravelAccomodationComponent;
  let fixture: ComponentFixture<TravelAccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAccomodationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
