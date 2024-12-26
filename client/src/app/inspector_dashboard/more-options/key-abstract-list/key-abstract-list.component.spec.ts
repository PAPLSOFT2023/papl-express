import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAbstractListComponent } from './key-abstract-list.component';

describe('KeyAbstractListComponent', () => {
  let component: KeyAbstractListComponent;
  let fixture: ComponentFixture<KeyAbstractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAbstractListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyAbstractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
