import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.baseUrl}/v1/users`;


  constructor(private http: HttpClient) { }

  suggestEmail(searchQuery: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?q=${searchQuery}`)
  }
}
