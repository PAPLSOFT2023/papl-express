import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreifSpecComponent } from './breif-spec.component';

describe('BreifSpecComponent', () => {
  let component: BreifSpecComponent;
  let fixture: ComponentFixture<BreifSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreifSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreifSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
