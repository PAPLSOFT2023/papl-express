import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WccListComponent } from './wcc-list.component';

describe('WccListComponent', () => {
  let component: WccListComponent;
  let fixture: ComponentFixture<WccListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WccListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
