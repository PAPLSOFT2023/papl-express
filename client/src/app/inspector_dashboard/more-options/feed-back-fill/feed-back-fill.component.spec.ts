import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackFillComponent } from './feed-back-fill.component';

describe('FeedBackFillComponent', () => {
  let component: FeedBackFillComponent;
  let fixture: ComponentFixture<FeedBackFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedBackFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedBackFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
