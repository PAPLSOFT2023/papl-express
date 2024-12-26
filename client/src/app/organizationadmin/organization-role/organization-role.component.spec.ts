import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRoleComponent } from './organization-role.component';

describe('OrganizationRoleComponent', () => {
  let component: OrganizationRoleComponent;
  let fixture: ComponentFixture<OrganizationRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
