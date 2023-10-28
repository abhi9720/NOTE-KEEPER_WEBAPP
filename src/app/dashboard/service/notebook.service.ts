import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  private NotebookSource = new BehaviorSubject<any>(null);
  Notebook$ = this.NotebookSource.asObservable();

  UpdateNotebookList(notebooks: any) {
    this.NotebookSource.next(notebooks)
  }

  private baseUrl = `${environment.baseUrl}/v1/notebooks`;

  constructor(private http: HttpClient) { }

  createNotebook(notebookData: any) {
    return this.http.post(`${this.baseUrl}`, notebookData);
  }

  getNotebooks() {
    return this.http.get(`${this.baseUrl}`);
  }

  getNotebooksPopulated() {
    return this.http.get(`${this.baseUrl}?populated=true`);
  }

  getNotebookById(notebookId: string) {
    return this.http.get(`${this.baseUrl}/${notebookId}`);
  }

  updateNotebook(notebookId: string, updatedData: any) {
    return this.http.put(`${this.baseUrl}/${notebookId}`, updatedData);
  }


  deleteNotebook(notebookId: string) {
    return this.http.delete(`${this.baseUrl}/${notebookId}`);
  }

}
