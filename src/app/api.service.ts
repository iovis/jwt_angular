import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  public getPublic(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/index`).pipe(pluck('data'));
  }
}
