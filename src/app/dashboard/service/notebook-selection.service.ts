import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebookSelectionService {
  private selectedNotebookSource = new BehaviorSubject<any>(null);
  selectedNotebook$ = this.selectedNotebookSource.asObservable();

  private lastSelectedNotebook: any = null;

  selectNotebook(notebook: any) {
    this.lastSelectedNotebook = notebook
    this.selectedNotebookSource.next(notebook);
  }

  getLastSelectedNotebook(): any {
    return this.lastSelectedNotebook;
  }
}
