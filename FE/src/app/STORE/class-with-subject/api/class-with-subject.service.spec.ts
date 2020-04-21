import { TestBed } from '@angular/core/testing';

import { ClassWithSubjectService } from './class-with-subject.service';

describe('ClassWithSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassWithSubjectService = TestBed.get(ClassWithSubjectService);
    expect(service).toBeTruthy();
  });
});
