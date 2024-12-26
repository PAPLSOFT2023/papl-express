import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDepartmentComponent } from './organization-department.component';

describe('OrganizationDepartmentComponent', () => {
  let component: OrganizationDepartmentComponent;
  let fixture: ComponentFixture<OrganizationDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
