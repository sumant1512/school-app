import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddResultComponent } from './profile-add-result.component';

describe('ProfileAddResultComponent', () => {
  let component: ProfileAddResultComponent;
  let fixture: ComponentFixture<ProfileAddResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAddResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAddResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
