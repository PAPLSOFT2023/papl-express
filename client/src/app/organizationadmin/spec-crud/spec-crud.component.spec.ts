import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecCrudComponent } from './spec-crud.component';

describe('SpecCrudComponent', () => {
  let component: SpecCrudComponent;
  let fixture: ComponentFixture<SpecCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
