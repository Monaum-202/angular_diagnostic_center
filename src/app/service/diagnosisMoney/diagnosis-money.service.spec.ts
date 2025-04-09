import { TestBed } from '@angular/core/testing';

import { DiagnosisMoneyService } from './diagnosis-money.service';

describe('DiagnosisMoneyService', () => {
  let service: DiagnosisMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
