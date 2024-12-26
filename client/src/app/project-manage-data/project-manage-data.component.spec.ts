import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManageDataComponent } from './project-manage-data.component';

describe('ProjectManageDataComponent', () => {
  let component: ProjectManageDataComponent;
  let fixture: ComponentFixture<ProjectManageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectManageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectManageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
