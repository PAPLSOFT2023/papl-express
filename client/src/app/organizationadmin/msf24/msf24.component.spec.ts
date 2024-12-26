import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Msf24Component } from './msf24.component';

describe('Msf24Component', () => {
  let component: Msf24Component;
  let fixture: ComponentFixture<Msf24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Msf24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Msf24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
