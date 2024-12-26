import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProductMasterComponent } from './sub-product-master.component';

describe('SubProductMasterComponent', () => {
  let component: SubProductMasterComponent;
  let fixture: ComponentFixture<SubProductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProductMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
