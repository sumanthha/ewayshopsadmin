import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.constant';
import { map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  loginAccount(login): Observable<Response[]> {
    let url = AppSettings.API_ENDPOINT + "api/token";
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Response[]>(`${url}`, login);
  }

  getProfileinfo(): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "/user-details";
    return this.http.get(`${url}`);
  }

  getAuthenticatedUser() {
    return localStorage.getItem('accessToken')
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return localStorage.getItem('accessToken')
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('accessToken')
    return !(user === null)
  }

  refreshToken() {
    var payload = {
      "refresh": localStorage.getItem('refreshToken')
    }
    let url = AppSettings.API_ENDPOINT + "api/token/refresh";
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Response[]>(`${url}`, payload);
  }

  logout() {
    return this.http.post<any>(
      `${AppSettings.API_ENDPOINT}api/logout`, {
    }).pipe(
      map(
        data => {
          localStorage.removeItem('userToken')
         
          return data;
        }
      )
    );

  }
}
