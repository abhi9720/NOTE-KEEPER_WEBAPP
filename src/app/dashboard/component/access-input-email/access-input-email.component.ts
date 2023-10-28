import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-access-input-email',
  templateUrl: './access-input-email.component.html',
  styleUrls: ['./access-input-email.component.css'],
})
export class AccessInputEmailComponent implements OnInit {
  shareForm: FormGroup;
  emailSuggestions: string[] = []; // Array to hold email suggestions

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.shareForm = this.fb.group({
      sharedWith: [[], Validators.required],
      permissions: this.fb.group({
        view: [{ value: true, disabled: true }],
        edit: [false],
        delete: [false],
      }),
    });
  }


  ngOnInit(): void { }

  shareNotes() {
    if (this.shareForm.valid) {
      const data = this.shareForm.value;
      console.log(data);
      this.ref.close(data);
    }
  }

  // Add a method to search for email suggestions
  // Update your Angular component
  searchEmails(event: any) {
    const searchQuery = event.query;
    this.userService.suggestEmail(searchQuery).subscribe((suggestions: string[]) => {
      this.emailSuggestions = suggestions;
    });
  }

}
