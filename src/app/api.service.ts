import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getPublic(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/index`).pipe(pluck('data'));
  }

  public getPrivate(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/private/index`, this.tokenService.headers)
      .pipe(catchError(this.handleError('getPrivate')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Operation ${operation} failed: ${error.error}`);
      return of(result as T);
    };
  }
}
