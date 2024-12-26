import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WccDashviewComponent } from './wcc-dashview.component';

describe('WccDashviewComponent', () => {
  let component: WccDashviewComponent;
  let fixture: ComponentFixture<WccDashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WccDashviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WccDashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
