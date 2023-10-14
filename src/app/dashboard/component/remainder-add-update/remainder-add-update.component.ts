import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-remainder-add-update',
  templateUrl: './remainder-add-update.component.html',
  styleUrls: ['./remainder-add-update.component.css']
})
export class RemainderAddUpdateComponent {
  reminderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      note: [''],
      datetime: [new Date(), [Validators.required]],
    });
  }


  createReminder() {
    if (this.reminderForm.valid) {
      const { title, note, datetime } = this.reminderForm.value;

      // You can send the reminder data to your backend or handle it as needed
      console.log('Reminder Title: ', title);
      console.log('Reminder Note: ', note);
      console.log('Reminder Date & Time: ', datetime);

      // Clear the form
      this.reminderForm.reset();
    }
  }
}
