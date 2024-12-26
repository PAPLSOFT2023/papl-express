import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAbstractComponent } from './key-abstract.component';

describe('KeyAbstractComponent', () => {
  let component: KeyAbstractComponent;
  let fixture: ComponentFixture<KeyAbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAbstractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
