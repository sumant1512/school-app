import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingedSubjectComponent } from './assinged-subject.component';

describe('AssingedSubjectComponent', () => {
  let component: AssingedSubjectComponent;
  let fixture: ComponentFixture<AssingedSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingedSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingedSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
