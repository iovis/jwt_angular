import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email, password) {
    const loginData = {
      user_login: {
        login: email,
        password: password
      }
    };

    return this.http.post(`${this.apiUrl}/users/sign_in`, loginData, httpOptions);
  }
}
