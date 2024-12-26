import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoDetailsComponent } from './autho-details.component';

describe('AuthoDetailsComponent', () => {
  let component: AuthoDetailsComponent;
  let fixture: ComponentFixture<AuthoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
