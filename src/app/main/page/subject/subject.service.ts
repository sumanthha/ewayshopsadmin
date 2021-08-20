import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from 'app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  getSubjects(payload): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject?page="+payload['page']+'&page_size='+payload['page_size']+'&q='+payload['q']+'&order_by='+payload['order_by']+'&sort='+payload['sort']+'&is_deleted=0';

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${url}`);
  }
  getAllSubjects(): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject?is_deleted=0";

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${url}`);
  }
  createSubject(payload): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject/create";

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${url}`,payload);
  }
  viewSubject(id): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject/"+id;

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${url}`);
  }
  updateSubject(payload,id): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject/update/"+id;

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${url}`,payload);
  }
  deleteSubject(payload,id): Observable<Object> {
    let url = AppSettings.API_ENDPOINT + "api/subject/delete/"+id;

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${url}`,payload);
  }
}
