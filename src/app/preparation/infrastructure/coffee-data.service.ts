import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeLotApi } from '../../coffee-lot/application/coffee-lot.api';
import { RoastProfileApi } from '../../roasting/application/roast-profile.api';
import { CoffeeLot } from '../../coffee-lot/domain/model/coffee-lot.entity';
import { RoastProfile } from '../../roasting/domain/model/roast-profile.entity';

@Injectable({
  providedIn: 'root',
})
export class CoffeeDataService {
  constructor(
    private coffeeLotApi: CoffeeLotApi,
    private roastProfileApi: RoastProfileApi,
  ) {}

  getCoffeeLots(): Observable<CoffeeLot[]> {
    return this.coffeeLotApi.getAll();
  }

  getRoastProfiles(): Observable<RoastProfile[]> {
    return this.roastProfileApi.getAll();
  }
}