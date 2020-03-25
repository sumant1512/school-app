import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDialogCommonComponent } from './assign-dialog-common.component';

describe('AssignDialogCommonComponent', () => {
  let component: AssignDialogCommonComponent;
  let fixture: ComponentFixture<AssignDialogCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDialogCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDialogCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
