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
  private deleteRoute = `${this.url}/service/favorite-delete`;
  private verifyFavorited = `${this.url}/service/favorite-count`;
  private getAllRoute = `${this.url}/service/favorites`;

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

  delete(serviceId: string, uid: string, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      user_id: uid,
      job_id: serviceId,
    }

    return this.http.post<any>(this.deleteRoute, obj, {
      headers: header,
    });
  }

  verifyIfServiceHasFavorited(serviceId: string, uid: string, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      user_id: uid,
      job_id: serviceId,
    }

    return this.http.post<any>(this.verifyFavorited, obj, {
      headers: header,
    });
  }

  getAll(uid: string, token: string): Observable<any> {
    const header = { Authorization: `Bearer ${token}` };

    const obj = {
      user_id: uid,
    }

    return this.http.post<any>(this.getAllRoute, obj, {
      headers: header,
    });
  }
}
