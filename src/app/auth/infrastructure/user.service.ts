import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/infrastructure/base.service';
import { User } from '../domain/model/user.entity';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

const usersResourceEndpointPath = environment.usersEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(protected override http: HttpClient, private tokenService: TokenService) {
    super(http);
    this.resourceEndpoint = usersResourceEndpointPath;
  }

  /**
   * Authenticates a user by email and password
   * @param email - The user's email
   * @param password - The user's password
   * @returns An Observable of the authenticated user
   */
  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.resourcePath()}?email=${email}&password=${password}`).pipe(
        map(users => {
          if (users.length === 1) {
            return users[0];
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError(this.handleError)
      );
  }

  
  createProfile(user: User): Observable<User> {
    return this.http.post<User>(`${environment.serverBaseUrl}/api/v1/profiles`, user);
  }

  
  updateProfile(userId: number, updatedProfile: Partial<User>): Observable<User> {
    const authToken = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.patch<User>(`${environment.serverBaseUrl}/api/v1/profiles/${userId}`, updatedProfile, { headers: headers });
  }

  /**
   * El PATCH devuelve {@link ProfileResource} (sin password, isFirstLogin, etc.).
   * Fusiona con el usuario previo para no perder datos en {@code localStorage}.
   */
  mergeProfileResponse(previous: User, apiBody: unknown): User {
    if (!apiBody || typeof apiBody !== 'object') {
      return previous;
    }
    const a = apiBody as Record<string, unknown>;
    
    const mergeStr = (key: string, fallback: string): string => {
      if (!Object.prototype.hasOwnProperty.call(a, key)) {
        return fallback;
      }
      const v = a[key];
      if (v == null) {
        return fallback;
      }
      return String(v);
    };
    return new User({
      id: typeof a['id'] === 'number' ? (a['id'] as number) : previous.id,
      name: mergeStr('name', previous.name),
      email: mergeStr('email', previous.email),
      password: previous.password,
      role: mergeStr('role', previous.role),
      cafeteriaName: mergeStr('cafeteriaName', previous.cafeteriaName),
      experience: mergeStr('experience', previous.experience),
      profilePicture: mergeStr('profilePicture', previous.profilePicture),
      paymentMethod: mergeStr('paymentMethod', previous.paymentMethod),
      isFirstLogin: previous.isFirstLogin,
      plan: mergeStr('plan', previous.plan),
      hasPlan:
        typeof a['hasPlan'] === 'boolean'
          ? (a['hasPlan'] as boolean)
          : previous.hasPlan,
      home: previous.home,
    });
  }

  
  getProfileById(userId: number): Observable<User> {
    return this.getById(userId);
  }

  /**
   * Retrieves all users
   * @returns An Observable array of all users
   */
  getAllUsers(): Observable<User[]> {
    return this.getAll();
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${environment.serverBaseUrl}/api/v1/profiles?email=${email}`);
  }

}