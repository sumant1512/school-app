import { TestBed } from '@angular/core/testing';

import { SuppExamService } from './supp-exam.service';

describe('SuppExamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuppExamService = TestBed.get(SuppExamService);
    expect(service).toBeTruthy();
  });
});
