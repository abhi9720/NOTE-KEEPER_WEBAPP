import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedNoteService {

  private baseUrl = `${environment.baseUrl}/v1/share-notes`;

  constructor(private http: HttpClient) { }

  shareNote(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, payload);
  }

  unshareNote(sharedNoteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${sharedNoteId}`);
  }

  updateSharedNotePermissions(sharedNoteId: string, permissions: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${sharedNoteId}`, { permissions });
  }

  getSharedNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
