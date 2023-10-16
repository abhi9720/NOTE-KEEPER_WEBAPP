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
      date: [new Date(), [Validators.required]], // Separate date control
      time: [new Date().toLocaleTimeString(), [Validators.required]], // Separate time control
    });
  }

  createReminder() {
    if (this.reminderForm.valid) {
      console.log(this.reminderForm.value);

      const { title, note, date, time } = this.reminderForm.value;

      // Combine date and time to create a full datetime string
      const datetime = `${date} ${time}`;

      // You can send the reminder data to your backend or handle it as needed
      console.log('Reminder Title: ', title);
      console.log('Reminder Note: ', note);
      console.log('Full Date & Time: ', datetime);

      // Clear the form
      // this.reminderForm.reset();
    }
  }
}
