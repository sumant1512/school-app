import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplimentryExamComponent } from './supplimentry-exam.component';

describe('SupplimentryExamComponent', () => {
  let component: SupplimentryExamComponent;
  let fixture: ComponentFixture<SupplimentryExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplimentryExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplimentryExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
