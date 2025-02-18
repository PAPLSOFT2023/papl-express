import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionComponent } from './rejection.component';

describe('RejectionComponent', () => {
  let component: RejectionComponent;
  let fixture: ComponentFixture<RejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
