import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewResultComponent } from './profile-view-result.component';

describe('ProfileViewResultComponent', () => {
  let component: ProfileViewResultComponent;
  let fixture: ComponentFixture<ProfileViewResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
