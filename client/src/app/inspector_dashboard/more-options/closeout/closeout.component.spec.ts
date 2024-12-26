import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseoutComponent } from './closeout.component';

describe('CloseoutComponent', () => {
  let component: CloseoutComponent;
  let fixture: ComponentFixture<CloseoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
