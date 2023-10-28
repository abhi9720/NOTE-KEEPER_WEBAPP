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
  emailSuggestions: string[] = []; // Array to hold email suggestions

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {
    this.shareForm = this.fb.group({
      email: [[]],
    });
  }

  ngOnInit(): void { }

  onShareNotebook() {
    const recipientEmail = this.shareForm.get('email')?.value;
    console.log(recipientEmail);

    this.ref.close(recipientEmail);

  }

  // Add a method to search for email suggestions
  searchEmails(event: any) {
    // Simulate email search with a list of suggestions (you can replace this with an API call)
    this.emailSuggestions = [
      'user1@example.com',
      'user2@example.com',
      'user3@example.com',
      // Add more suggestions
    ];
  }
}
