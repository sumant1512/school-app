import { TestBed } from '@angular/core/testing';

import { ErrorDialogFunctionsService } from './error-dialog-functions.service';

describe('ErrorDialogFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorDialogFunctionsService = TestBed.get(ErrorDialogFunctionsService);
    expect(service).toBeTruthy();
  });
});
