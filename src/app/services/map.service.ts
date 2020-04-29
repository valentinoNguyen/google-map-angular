import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private client: HttpClient) { }

  getWorldMapJson(): Observable<any> {
    return this.client.get<any>('/assets/countries-users.geo.json');
  }

}
