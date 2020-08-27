import { TestBed } from '@angular/core/testing';

import { AsignacionActividaService } from './asignacion-activida.service';

describe('AsignacionActividaService', () => {
  let service: AsignacionActividaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionActividaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
