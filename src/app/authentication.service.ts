import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email, password) {
    const loginData = {
      user_login: {
        login: email,
        password: password
      }
    };

    return this.http.post(
      `${this.apiUrl}/users/sign_in`,
      loginData,
      httpOptions
    );
  }

  refreshToken() {
    return this.http.post(
      `${this.apiUrl}/users/refresh_token`,
      null,
      this.tokenService.headers
    );
  }

  logout() {
    return this.http.delete(
      `${this.apiUrl}/users/sign_out`,
      this.tokenService.headers
    );
  }
}
