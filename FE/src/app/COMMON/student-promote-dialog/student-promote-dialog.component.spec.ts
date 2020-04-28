import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPromoteDialogComponent } from './student-promote-dialog.component';

describe('StudentPromoteDialogComponent', () => {
  let component: StudentPromoteDialogComponent;
  let fixture: ComponentFixture<StudentPromoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPromoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPromoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
