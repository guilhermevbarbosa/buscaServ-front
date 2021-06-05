import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080';
  private createRoute = `${this.url}/service/favorite`;

  create(serviceId: string, uid: string, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      user_id: uid,
      job_id: serviceId,
    }

    return this.http.post<any>(this.createRoute, obj, {
      headers: header,
    });
  }
}
