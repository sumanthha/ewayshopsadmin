import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
 
  viewProfile(id): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/user/profile/"+id;
   
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.get(`${url}`);
  }
  updateProfile(payload,id): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/user/profile/update/"+id;

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${url}`,payload);
  }
 
}
