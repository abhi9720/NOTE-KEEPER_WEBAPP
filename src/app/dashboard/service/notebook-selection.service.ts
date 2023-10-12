import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebookSelectionService {
  private selectedNotebookSource = new BehaviorSubject<any>(null);
  selectedNotebook$ = this.selectedNotebookSource.asObservable();

  selectNotebook(notebook: any) {
    
    this.selectedNotebookSource.next(notebook);
  }
}
