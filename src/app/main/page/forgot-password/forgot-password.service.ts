import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.constant';
import { map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  Reset_link(email): Observable<Response[]> {
		let url = AppSettings.API_ENDPOINT + "api/user/resetpasswordtoken/";
		let tokenHeader = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		return this.http.post<Response[]>(`${url}`, email);
  }
  
  
}
