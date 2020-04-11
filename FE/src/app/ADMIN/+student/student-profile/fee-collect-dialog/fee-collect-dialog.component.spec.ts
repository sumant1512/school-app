import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCollectDialogComponent } from './fee-collect-dialog.component';

describe('FeeCollectDialogComponent', () => {
  let component: FeeCollectDialogComponent;
  let fixture: ComponentFixture<FeeCollectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeCollectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCollectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
