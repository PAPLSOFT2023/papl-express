import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailResponseComponent } from './mail-response.component';

describe('MailResponseComponent', () => {
  let component: MailResponseComponent;
  let fixture: ComponentFixture<MailResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
