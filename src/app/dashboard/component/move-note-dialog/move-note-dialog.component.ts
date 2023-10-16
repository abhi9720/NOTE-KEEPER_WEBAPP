import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-move-note-dialog',
  templateUrl: './move-note-dialog.component.html',
  styleUrls: ['./move-note-dialog.component.css'],
})
export class MoveNoteDialogComponent implements OnInit {
  moveNoteForm: FormGroup;
  notebooks: any = []

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef
    , private notebookService: NotebookService) {
    this.moveNoteForm = this.fb.group({
      destinationNotebookId: [null],
    });
  }

  ngOnInit(): void {
    this.fetchNoteBooks()
  }

  fetchNoteBooks() {
    this.notebookService.getNotebooks().subscribe(
      (notebooks: any) => {
        this.notebooks = notebooks;
      });
  }

  onMoveNote() {
    const destinationNotebookId = this.moveNoteForm.get('destinationNotebookId')?.value;

    if (destinationNotebookId) {
      this.ref.close(destinationNotebookId); // Close the dialog and pass the destination notebook ID
    }
  }
}
