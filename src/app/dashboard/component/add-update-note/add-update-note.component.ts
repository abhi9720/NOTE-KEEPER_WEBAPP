import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-update-note',
  templateUrl: './add-update-note.component.html',
  styleUrls: ['./add-update-note.component.css'],
})
export class AddUpdateNoteComponent {
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private config:DynamicDialogConfig) {
    this.noteForm = this.fb.group({
      title: [''],
      body: [''],
      color: ['#fff'],
      listType: ['null'], 
      listItems: this.fb.array([]), // Use a FormArray to handle listItems
    });

    if (this.config?.data) {
      const data = this.config.data;
      this.noteForm.patchValue(data);
    }
  }

  selectColor(color: string) {
    this.noteForm.get('color')?.setValue(color);
  }

  
  get listItems(): FormArray {
    return this.noteForm.get('listItems') as FormArray;
  }

  // Add user input items to the FormArray dynamically
  addUserInputItem(): void {
    const type =  this.noteForm.value.listType
    
    const listItems = this.noteForm.get('listItems') as FormArray;

    if (type === 'text') {
      listItems.push(
        this.fb.group({
          type: [type],
          items: this.fb.array([this.fb.control('')]),
        })
      );
    } else if (type === 'checkbox' || type === 'bullet') {
      listItems.push(
        this.fb.group({
          type: [type],
          items: this.fb.array([this.fb.group({ label: '', checked: false })]),
        })
      );
    }
  }

  removeUserInputItem(index: number): void {
    const listItems = this.noteForm.get('listItems') as FormArray;
    listItems.removeAt(index);
  }

  submit(){
    console.log(this.noteForm.value);
    
  }
}
