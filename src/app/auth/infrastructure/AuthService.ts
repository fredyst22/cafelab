import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../domain/model/user.entity';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private http: HttpClient, private router: Router, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.serverBaseUrl}/api/v1/authentication/sign-in`, { email, password })
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.token);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  
  getCurrentUserId(): string {
    const user = this.getCurrentUser();
    return user ? user.id.toString() : '';
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}