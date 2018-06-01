import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

interface HttpOptions {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public tokenKey = 'rmd-token';

  get token(): string {
    return localStorage.getItem(this.tokenKey);
  }

  set token(value: string) {
    localStorage.setItem(this.tokenKey, value);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get headers(): HttpOptions {
    if (this.isLoggedIn) {
      return {
        headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      };
    }
  }

  clearToken() {
    return localStorage.removeItem(this.tokenKey);
  }
}
