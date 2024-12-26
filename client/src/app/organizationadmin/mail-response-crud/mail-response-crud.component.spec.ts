import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailResponseCrudComponent } from './mail-response-crud.component';

describe('MailResponseCrudComponent', () => {
  let component: MailResponseCrudComponent;
  let fixture: ComponentFixture<MailResponseCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailResponseCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailResponseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
