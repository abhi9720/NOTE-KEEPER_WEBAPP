import { Component, OnInit } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit{
  Notebooks: any[]=[];

  addNotebookClicked = false;

  constructor(
    private notebookSelectionService: NotebookSelectionService,
    private noteService: NoteService  
  ) {}
  
  selectNotebook(notebook: any) {
    this.notebookSelectionService.selectNotebook(notebook);
  }

  addNotebook(newNotebookName: string) {
    
     const newNotebook = { name: newNotebookName };
     console.log(newNotebook);
     
    this.noteService.addNotebook(newNotebookName).subscribe((response) => {
       if (response) {
        this.Notebooks.push(newNotebook);
      }
    });
    this.addNotebookClicked =  false
  }

  ngOnInit() {
     this.noteService.getNotebookNames().subscribe(notebooks => {
      this.Notebooks = notebooks;
      this.selectNotebook(this.Notebooks[0])
    });
  }

}
