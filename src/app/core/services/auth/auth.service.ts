import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = '';

  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
    grant_type: string,
    mobileid: string
  ): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('Password', password)
      .set('grant_type', grant_type)
      .set('mobileid', mobileid);

    return this.http.post(`${environment.baseUrl}/token`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
