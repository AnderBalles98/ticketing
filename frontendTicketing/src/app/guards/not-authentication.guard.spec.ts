import { TestBed } from '@angular/core/testing';

import { NotAuthenticationGuard } from './not-authentication.guard';

describe('NotAuthenticationGuard', () => {
  let guard: NotAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
