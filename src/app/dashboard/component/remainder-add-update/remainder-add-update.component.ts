import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../service/note.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-remainder-add-update',
  templateUrl: './remainder-add-update.component.html',
  styleUrls: ['./remainder-add-update.component.css']
})
export class RemainderAddUpdateComponent {
  reminderForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService,
    public ref: DynamicDialogRef, private config: DynamicDialogConfig
  ) {
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      body: [''],
      reminder: [new Date(), [Validators.required]],
    });


    if (this.config?.data) {
      // Patch data if it is update
    }
  }

  createReminder() {
    if (this.reminderForm.valid) {
      console.log(this.reminderForm.value);

      this.ref.close(this.reminderForm.value)


      // Clear the form
      this.reminderForm.reset();
    }
  }
}
