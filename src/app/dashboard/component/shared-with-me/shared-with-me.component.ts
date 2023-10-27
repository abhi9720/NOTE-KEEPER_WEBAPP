import { Component, OnInit } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { Router } from '@angular/router';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.css']
})
export class SharedWithMeComponent implements OnInit {
  Notebooks: any[] = [];
  showNoteBooks = false;
  addNotebookClicked = false;
  isFetching = false;
  noteBookSelected: any;
  constructor(
    private notebookSelectionService: NotebookSelectionService,
    private notebookService: NotebookService,
  ) {

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

    this.notebookSelectionService.selectedNotebook$.subscribe(selectedNotebook => {
      this.noteBookSelected = selectedNotebook;
    })


    this.fetchNoteBooks()
  }

  fetchNoteBooks() {

    this.isFetching = true
    this.notebookService.getNotebooks().subscribe(
      (notebooks: any) => {
        this.Notebooks = notebooks;
        this.isFetching = false;
        this.showNoteBooks = true
      });
  }


  deleteNoteBook(notebookId: any, idx: number) {
    this.notebookService.deleteNotebook(notebookId).subscribe(
      (response) => {
        this.Notebooks.splice(idx, 1);
        const nextIndex = idx == 0 ? idx + 1 : idx - 1;
        this.notebookSelectionService.selectNotebook(this.Notebooks[nextIndex])
      },
      (error) => {

      }
    )
  }

  updateNoteBookName(event: Event, idx: number) {
    this.Notebooks[idx] = event;
  }

}
