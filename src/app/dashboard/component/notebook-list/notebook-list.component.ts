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
  showNoteBooks = false;
  addNotebookClicked = false;

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
    this.notebookSelectionService.selectNotebook(notebook);
  }

  addNotebook(newNotebookName: string) {

    const newNotebook = { name: newNotebookName };
    console.log(newNotebook);

    this.notebookService.createNotebook(newNotebookName).subscribe(
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

  toggleNoteBookList(value: boolean) {
    this.showNoteBooks = value;
  }

  ngOnInit() {
    this.notebookService.getNotebooks().subscribe(
      (notebooks: any) => {
        this.Notebooks = notebooks;
        this.selectNotebook(this.Notebooks[0])
      });
  }

}
