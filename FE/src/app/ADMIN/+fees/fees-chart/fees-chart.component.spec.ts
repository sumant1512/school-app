import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesChartComponent } from './fees-chart.component';

describe('FeesChartComponent', () => {
  let component: FeesChartComponent;
  let fixture: ComponentFixture<FeesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
