/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PolishService } from './polish.service';

describe('PolishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolishService]
    });
  });

  it('should ...', inject([PolishService], (service: PolishService) => {
    expect(service).toBeTruthy();
  }));
});
