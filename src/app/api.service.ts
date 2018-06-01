import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

interface HttpOptions {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get httpOptions(): HttpOptions {
    const token = localStorage.getItem('rmd-token');

    if (token) {
      return {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
      };
    }
  }

  public getPublic(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/index`).pipe(pluck('data'));
  }

  public getPrivate(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/private/index`, this.httpOptions)
      .pipe(catchError(this.handleError('getPrivate')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Operation ${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
