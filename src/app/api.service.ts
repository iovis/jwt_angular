import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';
import { environment } from '../environments/environment';

const UNAUTHORIZED = 401;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  public getPublic(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/index`).pipe(pluck('data'));
  }

  public getPrivate(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/private/index`, this.tokenService.headers)
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>(defaultResult?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      if (error.status === UNAUTHORIZED) {
        this.renewToken();
      }

      return of(defaultResult as T);
    };
  }

  private renewToken() {
    this.authenticationService.refreshToken().subscribe(
      data => this.successRenew(data),
      error => this.failedRenew()
    );
  }

  private successRenew(data) {
    this.tokenService.token = data.auth_token;
    location.reload();
  }

  private failedRenew() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
