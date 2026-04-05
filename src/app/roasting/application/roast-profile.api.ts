import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, switchMap } from 'rxjs';
import { RoastProfileApiEndpoint } from '../infrastructure/roast-profile-api-endpoint';
import type { RoastProfile } from '../domain/model/roast-profile.entity';

@Injectable({
  providedIn: 'root',
})
export class RoastProfileApi {
  constructor(
    private readonly roastProfileApiEndpoint: RoastProfileApiEndpoint,
    private readonly translate: TranslateService,
  ) {}

  getAll(): Observable<RoastProfile[]> {
    return this.roastProfileApiEndpoint.getAll();
  }

  getById(id: number): Observable<RoastProfile> {
    return this.roastProfileApiEndpoint.getById(id);
  }

  searchRoastProfiles(query: string): Observable<RoastProfile[]> {
    const q = query.trim().toLowerCase();
    return this.getAll().pipe(
      map((rows) =>
        !q
          ? rows
          : rows.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.type.toLowerCase().includes(q) ||
                String(p.lot).includes(q),
            ),
      ),
    );
  }

  filterProfiles(
    showFavoritesOnly: boolean,
    sortOrder: 'asc' | 'desc',
  ): Observable<RoastProfile[]> {
    return this.getAll().pipe(
      map((profiles) => {
        let filtered = profiles;
        if (showFavoritesOnly) {
          filtered = filtered.filter((p) => p.isFavorite);
        }
        return filtered.sort((a, b) => {
          const timeA = new Date(String(a.createdAt ?? '')).getTime();
          const timeB = new Date(String(b.createdAt ?? '')).getTime();
          return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
        });
      }),
    );
  }

  create(entity: RoastProfile): Observable<RoastProfile> {
    return this.roastProfileApiEndpoint.create(entity);
  }

  update(id: number, entity: RoastProfile): Observable<RoastProfile> {
    return this.roastProfileApiEndpoint.update(entity, id);
  }

  delete(id: number): Observable<void> {
    return this.roastProfileApiEndpoint.delete(id);
  }

  toggleFavorite(id: number): Observable<RoastProfile> {
    return this.getById(id).pipe(
      map((profile) => ({ ...profile, isFavorite: !profile.isFavorite })),
      switchMap((updated) => this.update(id, updated)),
    );
  }

  duplicateProfile(id: number): Observable<RoastProfile> {
    const suffix = this.translate.instant('ROAST_PROFILE_BC.DUPLICATE_SUFFIX');
    return this.getById(id).pipe(
      switchMap((profile) =>
        this.create({
          ...profile,
          id: 0,
          userId: 0,
          name: `${profile.name}${suffix}`,
          isFavorite: false,
        }),
      ),
    );
  }
}