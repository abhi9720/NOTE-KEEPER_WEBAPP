import { Component, OnInit } from '@angular/core';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-notebookpage',
  templateUrl: './notebookpage.component.html',
  styleUrls: ['./notebookpage.component.css']
})
export class NotebookpageComponent implements OnInit {


  notebooks: any = []

  constructor(private notebookService: NotebookService) {
    this.notebookService.Notebook$.subscribe(notebooks => {
      // this.notebooks = notebooks;
      this.fetchNoteIWthPopulated()
    })
  }

  ngOnInit(): void {
    this.fetchNoteIWthPopulated()
  }

  fetchNoteIWthPopulated() {
    this.notebookService.getNotebooksPopulated().subscribe(
      (response) => {
        this.notebooks = response
      },
      (error) => {
        console.log(error);

      }
    )
  }

}
