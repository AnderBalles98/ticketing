import { TestBed } from '@angular/core/testing';

import { NotCompanyGuard } from './not-company.guard';

describe('NotCompanyGuard', () => {
  let guard: NotCompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotCompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
