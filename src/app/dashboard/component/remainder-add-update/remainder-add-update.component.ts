import { Component } from '@angular/core';
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
  isUpdate = false;

  constructor(private fb: FormBuilder, private noteService: NoteService,
    public ref: DynamicDialogRef, private config: DynamicDialogConfig
  ) {
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      body: [''],
      remainderDate: [this.getFormattedDateTime(new Date()), [Validators.required]],
    });



    console.log(this.config?.data);


    if (this.config?.data) {
      this.isUpdate = true
      this.config.data.remainderDate = this.getFormattedDateTime(this.config.data.remainderDate)
      this.reminderForm.patchValue(this.config.data)
    }
  }

  getFormattedDateTime(date: any) {
    return new Date(date).toISOString().substring(0, 16)
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
