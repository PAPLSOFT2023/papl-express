import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMasterComponent } from './organization-master.component';

describe('OrganizationMasterComponent', () => {
  let component: OrganizationMasterComponent;
  let fixture: ComponentFixture<OrganizationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
