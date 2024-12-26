import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAdminUserManageComponent } from './software-admin-user-manage.component';

describe('SoftwareAdminUserManageComponent', () => {
  let component: SoftwareAdminUserManageComponent;
  let fixture: ComponentFixture<SoftwareAdminUserManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareAdminUserManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareAdminUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
