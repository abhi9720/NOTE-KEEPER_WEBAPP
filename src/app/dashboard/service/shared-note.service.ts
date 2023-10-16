import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedNoteService {

  private baseUrl = 'http://localhost:3000/v1/share';

  constructor(private http: HttpClient) { }

  shareNote(noteId: string, sharedWith: string, permissions: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { noteId, sharedWith, permissions });
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
