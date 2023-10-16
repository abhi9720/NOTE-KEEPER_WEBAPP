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
  isEdit = false;
  noteId = null;
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.noteForm = this.fb.group({
      title: [''],
      body: [''],
      color: ['#fff'],
      listType: [''],
      listItems: this.fb.array([]), // Use a FormArray to handle listItems
    });

    if (this.config?.data) {
      console.log(this.config.data);

      const data = this.config.data;
      this.noteId = this.config.data._id;
      this.isEdit = true
      this.noteForm.patchValue({
        title: data.title,
        body: data.body,
        color: data.color,
        listType: data.listType,
      });


      if (data.listItems) {
        const listItemsFormArray = this.noteForm.get('listItems') as FormArray;

        while (listItemsFormArray.length) {
          listItemsFormArray.removeAt(0);
        }

        data.listItems.forEach((item: any) => {
          listItemsFormArray.push(this.fb.group({
            label: item.label,
            checked: item.checked,
          }));
        });
      }
    }
  }

  selectedColor: string | null = null;

  selectColor(color: string) {
    this.noteForm.get('color')?.setValue(color);
    this.selectedColor = color;
  }


  get listItems(): FormArray {
    return this.noteForm.get('listItems') as FormArray;
  }

  // Add user input items to the FormArray dynamically
  addlistItems(): void {
    const type = this.noteForm.value.listType
    const listItems = this.noteForm.get('listItems') as FormArray;
    if (type === 'checkbox' || type === 'bullet') {
      listItems.push(
        this.fb.group({
          label: [''],
          checked: [false]
        })
      );
    }
  }

  removelistItems(index: number): void {
    const listItems = this.noteForm.get('listItems') as FormArray;
    listItems.removeAt(index);
  }

  submit() {
    const data = this.noteForm.value;
    this.noteForm.value._id = this.noteId;
    this.ref.close(this.noteForm.value)

  }
}
