import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAdminDashboardComponent } from './software-admin-dashboard.component';

describe('SoftwareAdminDashboardComponent', () => {
  let component: SoftwareAdminDashboardComponent;
  let fixture: ComponentFixture<SoftwareAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareAdminDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
