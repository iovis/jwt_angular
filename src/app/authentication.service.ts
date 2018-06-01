import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: string;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('rmd-token');
  }

  public login(email, password) {
    const loginData = {
      'user_login': {
        'login': email,
        'password': password
      }
    };

    return this.http.post(`${this.apiUrl}/users/sign_in`, loginData, httpOptions);
  }
}
