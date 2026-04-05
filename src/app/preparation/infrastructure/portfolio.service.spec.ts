import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PortfolioService } from './portfolio.service';
import { BrewPortfolioApi } from '../../brew-portfolio/application/brew-portfolio.api';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioService,
        {
          provide: BrewPortfolioApi,
          useValue: {
            getAll: () => of([]),
            getById: () => of({ id: 1, userId: 1, name: 'P', createdAt: null }),
            create: (p: unknown) => of(p),
            update: (_id: number, p: unknown) => of(p),
            delete: () => of(undefined),
          },
        },
      ],
    });
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});