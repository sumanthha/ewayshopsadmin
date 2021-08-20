import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.constant';
import { map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPassService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  Reset_auth_token(auth_token,email,userid): Observable<Response[]> {
		let url = AppSettings.API_ENDPOINT + "api/user/check/";
		let tokenHeader = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		return this.http.post<Response[]>(`${url}`, {token:auth_token,email:email,user_id:userid});
  }

  Reset_password(auth_token,password): Observable<Response[]> {
		let url = AppSettings.API_ENDPOINT + "api/user/confirm/";
		let tokenHeader = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		return this.http.post<Response[]>(`${url}`, {token:auth_token,password:password});
  }
  
  
}
