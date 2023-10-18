import { Component, OnInit } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { NoteService } from '../../service/note.service';
import { Router } from '@angular/router';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit {
  Notebooks: any[] = [];
  showNoteBooks = true;
  addNotebookClicked = false;
  isFetching = false;
  noteBookSelected: any;
  constructor(
    private notebookSelectionService: NotebookSelectionService,
    private notebookService: NotebookService,
    private router: Router
  ) {
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }


  selectNotebook(notebook: any) {
    this.noteBookSelected = notebook;
    this.notebookSelectionService.selectNotebook(notebook);
  }

  noteBookClicked(notebook: any) {
    console.log("parent", notebook);

    this.selectNotebook(notebook)
    this.router.navigate(['/dashboard/note'])
  }

  addNotebook(newNotebookName: string) {

    const newNotebook = { name: newNotebookName };

    this.notebookService.createNotebook(newNotebook).subscribe(
      (response) => {
        if (response) {
          this.Notebooks.push(response);
          console.log(this.Notebooks);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.addNotebookClicked = false
  }

  toggleNoteBookList() {
    this.showNoteBooks = !this.showNoteBooks;

  }

  ngOnInit() {
    this.fetchNoteBooks();
  }

  fetchNoteBooks() {
    this.isFetching = true
    this.notebookService.getNotebooks().subscribe(
      (notebooks: any) => {
        this.Notebooks = notebooks;
        this.isFetching = false;
        this.selectNotebook(this.Notebooks[0])
      });
  }


  deleteNoteBook(notebookId: any, idx: number) {
    this.notebookService.deleteNotebook(notebookId).subscribe(
      (response) => {
        this.Notebooks.splice(idx, 1);
        const nextIndex = idx == 0 ? idx + 1 : idx - 1;
        this.notebookSelectionService.selectNotebook(this.Notebooks[nextIndex])
        // this.showMessage('info', 'Information', 'NoteBook Deleted')
      },
      (error) => {

      }
    )
  }

}
