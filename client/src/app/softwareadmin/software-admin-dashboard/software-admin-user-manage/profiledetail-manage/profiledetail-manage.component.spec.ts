import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledetailManageComponent } from './profiledetail-manage.component';

describe('ProfiledetailManageComponent', () => {
  let component: ProfiledetailManageComponent;
  let fixture: ComponentFixture<ProfiledetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiledetailManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiledetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
