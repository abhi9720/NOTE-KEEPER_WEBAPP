import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-move-note-dialog',
  templateUrl: './move-note-dialog.component.html',
  styleUrls: ['./move-note-dialog.component.css'],
})
export class MoveNoteDialogComponent {
  moveNoteForm: FormGroup;
  notebooks: any =  ["NoteBook1", "NoteBook2"]

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {
    this.moveNoteForm = this.fb.group({
      destinationNotebookId: [''], // Form control to select the destination notebook
    });
  }

  onMoveNote() {
    const destinationNotebookId = this.moveNoteForm.get('destinationNotebookId')?.value;

    if (destinationNotebookId) {
      this.ref.close(destinationNotebookId); // Close the dialog and pass the destination notebook ID
    }
  }
}
