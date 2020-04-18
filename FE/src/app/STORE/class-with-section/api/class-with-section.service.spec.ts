import { TestBed } from '@angular/core/testing';

import { ClassWithSectionService } from './class-with-section.service';

describe('ClassWithSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassWithSectionService = TestBed.get(ClassWithSectionService);
    expect(service).toBeTruthy();
  });
});
