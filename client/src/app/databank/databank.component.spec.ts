import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabankComponent } from './databank.component';

describe('DatabankComponent', () => {
  let component: DatabankComponent;
  let fixture: ComponentFixture<DatabankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
