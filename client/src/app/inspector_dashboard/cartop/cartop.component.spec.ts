import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartopComponent } from './cartop.component';

describe('CartopComponent', () => {
  let component: CartopComponent;
  let fixture: ComponentFixture<CartopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
