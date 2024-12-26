import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemDetailsComponent } from './oem-details.component';

describe('OemDetailsComponent', () => {
  let component: OemDetailsComponent;
  let fixture: ComponentFixture<OemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
