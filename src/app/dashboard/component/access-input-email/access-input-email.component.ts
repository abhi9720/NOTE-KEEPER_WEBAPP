import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-access-input-email',
  templateUrl: './access-input-email.component.html',
  styleUrls: ['./access-input-email.component.css'],
})
export class AccessInputEmailComponent implements OnInit {
  shareForm: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {
    this.shareForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void { }

  onShareNotebook() {
    if (this.shareForm.valid) {
      const recipientEmail = this.shareForm.get('email')?.value;
      this.ref.close(recipientEmail);
    }
  }
}
