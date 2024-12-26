import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineroomComponent } from './machineroom.component';

describe('MachineroomComponent', () => {
  let component: MachineroomComponent;
  let fixture: ComponentFixture<MachineroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
