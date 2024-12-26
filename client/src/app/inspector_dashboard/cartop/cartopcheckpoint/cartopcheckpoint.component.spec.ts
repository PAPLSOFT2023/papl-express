import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartopcheckpointComponent } from './cartopcheckpoint.component';

describe('CartopcheckpointComponent', () => {
  let component: CartopcheckpointComponent;
  let fixture: ComponentFixture<CartopcheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartopcheckpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartopcheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
