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
      console.log(notebooks);

      this.notebooks = notebooks
      console.log(this.notebooks);

    })
  }

  ngOnInit(): void {

  }


}
