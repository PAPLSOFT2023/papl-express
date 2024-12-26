import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPreProcessComponent } from './data-pre-process.component';

describe('DataPreProcessComponent', () => {
  let component: DataPreProcessComponent;
  let fixture: ComponentFixture<DataPreProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPreProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPreProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
