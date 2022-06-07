import { TestBed } from '@angular/core/testing';

import { EstadosMunicipiosService } from './estados-municipios.service';

describe('EstadosMunicipiosService', () => {
  let service: EstadosMunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosMunicipiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
