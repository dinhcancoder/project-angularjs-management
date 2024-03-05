import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  kanisdev(endPoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endPoint}`);
  }

  getData(endPoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endPoint}`);
  }

  postData(endPoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endPoint}`, data);
  }

  putData(endPoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endPoint}`, data);
  }

  deleteData(endPoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endPoint}/${id}`;
    return this.http.delete(url);
  }
}
