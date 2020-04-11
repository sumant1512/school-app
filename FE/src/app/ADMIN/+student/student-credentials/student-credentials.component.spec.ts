import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCredentialsComponent } from './student-credentials.component';

describe('StudentCredentialsComponent', () => {
  let component: StudentCredentialsComponent;
  let fixture: ComponentFixture<StudentCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
