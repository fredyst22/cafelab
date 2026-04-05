import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const raw = localStorage.getItem(this.tokenKey);
    if (raw == null) {
      return null;
    }
    const t = raw.trim();
    return t.length > 0 ? t : null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}