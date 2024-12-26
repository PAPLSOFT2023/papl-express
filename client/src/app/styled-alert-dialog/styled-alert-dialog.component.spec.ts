import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledAlertDialogComponent } from './styled-alert-dialog.component';

describe('StyledAlertDialogComponent', () => {
  let component: StyledAlertDialogComponent;
  let fixture: ComponentFixture<StyledAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyledAlertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyledAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
