import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://api.minebrat.com/api/v1/states'

  constructor(private http: HttpClient) { }

  getStates(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCities(stateId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities/${stateId}`);
  }
}
