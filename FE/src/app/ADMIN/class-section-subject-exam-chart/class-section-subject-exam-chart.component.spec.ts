import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSectionSubjectExamChartComponent } from './class-section-subject-exam-chart.component';

describe('ClassSectionSubjectExamChartComponent', () => {
  let component: ClassSectionSubjectExamChartComponent;
  let fixture: ComponentFixture<ClassSectionSubjectExamChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSectionSubjectExamChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSectionSubjectExamChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
