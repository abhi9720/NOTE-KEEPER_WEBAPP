// notebook-input.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notebook-input',
  templateUrl: './notebook-input.component.html',
  styleUrls: ['./notebook-input.component.css'],
})
export class NotebookInputComponent {
  @Output() notebookAdded = new EventEmitter<string>();

  newNotebookName = '';

  saveNotebook() {
    if (this.newNotebookName) {
      this.notebookAdded.emit(this.newNotebookName);
      this.newNotebookName = '';
    }
  }
}
