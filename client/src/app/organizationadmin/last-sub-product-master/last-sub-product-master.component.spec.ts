import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSubProductMasterComponent } from './last-sub-product-master.component';

describe('LastSubProductMasterComponent', () => {
  let component: LastSubProductMasterComponent;
  let fixture: ComponentFixture<LastSubProductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSubProductMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSubProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
