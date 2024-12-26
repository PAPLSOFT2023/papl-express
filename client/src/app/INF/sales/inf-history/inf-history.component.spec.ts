import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfHistoryComponent } from './inf-history.component';

describe('InfHistoryComponent', () => {
  let component: InfHistoryComponent;
  let fixture: ComponentFixture<InfHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
