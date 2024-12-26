import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WccViewComponent } from './wcc-view.component';

describe('WccViewComponent', () => {
  let component: WccViewComponent;
  let fixture: ComponentFixture<WccViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WccViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WccViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
