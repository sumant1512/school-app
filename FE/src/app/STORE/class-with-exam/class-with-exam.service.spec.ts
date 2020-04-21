import { TestBed } from '@angular/core/testing';

import { ClassWithExamService } from './api/class-with-exam.service';

describe('ClassWithExamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassWithExamService = TestBed.get(ClassWithExamService);
    expect(service).toBeTruthy();
  });
});
