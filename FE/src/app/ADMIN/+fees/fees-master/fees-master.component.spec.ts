import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesMasterComponent } from './fees-master.component';

describe('FeesMasterComponent', () => {
  let component: FeesMasterComponent;
  let fixture: ComponentFixture<FeesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
