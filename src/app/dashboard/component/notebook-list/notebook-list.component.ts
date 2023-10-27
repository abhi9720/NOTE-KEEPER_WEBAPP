import { Component, OnInit } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { Router } from '@angular/router';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit {
  Notebooks: any[] = [];
  showNoteBooks = false;
  addNotebookClicked = false;
  isFetching = false;
  noteBookSelected: any;
  constructor(
    private notebookSelectionService: NotebookSelectionService,
    private notebookService: NotebookService,
    private router: Router
  ) {

  }


  addNotebook(newNotebookName: string) {

    const newNotebook = { name: newNotebookName };

    this.notebookService.createNotebook(newNotebook).subscribe(
      (response) => {
        if (response) {
          this.Notebooks.push(response);
          this.notebookService.UpdateNotebookList(this.Notebooks)
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
        this.notebookService.UpdateNotebookList(this.Notebooks)
      });
  }


  deleteNoteBook(notebookId: any, idx: number) {
    this.notebookService.deleteNotebook(notebookId).subscribe(
      (response) => {
        // this.Notebooks.splice(idx, 1);
        console.log(this.notebookSelectionService.getLastSelectedNotebook());
        console.log(this.Notebooks[idx]);

        console.log(this.notebookSelectionService.getLastSelectedNotebook()?._id === this.Notebooks[idx]._id);

        if (this.notebookSelectionService.getLastSelectedNotebook()?._id === this.Notebooks[idx]._id) {
          this.router.navigate(['/dashboard/notebooks'])
        }
        this.Notebooks.splice(idx, 1);
      },
      (error) => {

      }
    )
  }

  updateNoteBookName(event: Event, idx: number) {
    this.Notebooks[idx] = event;
  }

}
