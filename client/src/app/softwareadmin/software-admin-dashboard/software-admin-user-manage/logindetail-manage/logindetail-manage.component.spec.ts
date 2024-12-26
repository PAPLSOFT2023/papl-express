import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindetailManageComponent } from './logindetail-manage.component';

describe('LogindetailManageComponent', () => {
  let component: LogindetailManageComponent;
  let fixture: ComponentFixture<LogindetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogindetailManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogindetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
