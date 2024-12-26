import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDefaultCcComponent } from './client-default-cc.component';

describe('ClientDefaultCcComponent', () => {
  let component: ClientDefaultCcComponent;
  let fixture: ComponentFixture<ClientDefaultCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDefaultCcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDefaultCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
