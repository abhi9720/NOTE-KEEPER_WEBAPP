import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  private baseUrl = 'http://localhost:3000/v1/notebooks';

  constructor(private http: HttpClient) { }

  createNotebook(notebookData: any) {
    return this.http.post(`${this.baseUrl}`, notebookData);
  }

  getNotebooks() {
    return this.http.get(`${this.baseUrl}`);
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
