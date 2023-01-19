import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeFormComponent } from './project-type-form.component';

describe('ProjectTypeFormComponent', () => {
  let component: ProjectTypeFormComponent;
  let fixture: ComponentFixture<ProjectTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
