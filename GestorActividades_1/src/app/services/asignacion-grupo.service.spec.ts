import { TestBed } from '@angular/core/testing';

import { AsignacionGrupoService } from './asignacion-grupo.service';

describe('AsignacionGrupoService', () => {
  let service: AsignacionGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
