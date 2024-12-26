import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUserManagementComponent } from './organization-user-management.component';

describe('OrganizationUserManagementComponent', () => {
  let component: OrganizationUserManagementComponent;
  let fixture: ComponentFixture<OrganizationUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUserManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
