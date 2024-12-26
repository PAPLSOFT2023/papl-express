import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingUnitsComponent } from './listing-units.component';

describe('ListingUnitsComponent', () => {
  let component: ListingUnitsComponent;
  let fixture: ComponentFixture<ListingUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingUnitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
