import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAbstractDashviewComponent } from './key-abstract-dashview.component';

describe('KeyAbstractDashviewComponent', () => {
  let component: KeyAbstractDashviewComponent;
  let fixture: ComponentFixture<KeyAbstractDashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAbstractDashviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyAbstractDashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
