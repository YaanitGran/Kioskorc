import { TestBed } from '@angular/core/testing';

import { Procedure } from './procedure';

describe('Procedure', () => {
  let service: Procedure;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Procedure);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
