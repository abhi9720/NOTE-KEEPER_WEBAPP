import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {


  private baseUrl = `${environment.baseUrl}/v1/note`;

  constructor(private http: HttpClient) { }

  createNote(note: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, note);
  }

  updateCheckbox(noteId: string, listItemIndex: number, checked: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}/${noteId}/update-checkbox/${listItemIndex}`, { checked });
  }

  updateNote(noteId: string, updatedNote: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${noteId}`, updatedNote);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${noteId}`);
  }

  getPinNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pinned/all`);
  }

  pinNote(noteId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${noteId}/pin`, {});
  }

  getAllNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


  getNotesByNoteBook(noteBookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${noteBookId}`);
  }

  updateNoteCheckBox(noteId: any, requestBody: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${noteId}/update-checkbox`, requestBody)
  }

  getRemainder() {
    return this.http.get(`${this.baseUrl}/remainders`)
  }


}
