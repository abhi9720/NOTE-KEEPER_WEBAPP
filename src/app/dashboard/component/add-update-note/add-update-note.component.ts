import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccessInputEmailComponent } from '../access-input-email/access-input-email.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { MoveNoteDialogComponent } from '../move-note-dialog/move-note-dialog.component';
import { NoteService } from '../../service/note.service';
import { SharedNoteService } from '../../service/shared-note.service';

@Component({
  selector: 'app-add-update-note',
  templateUrl: './add-update-note.component.html',
  styleUrls: ['./add-update-note.component.css'],
})


export class AddUpdateNoteComponent implements OnInit {
  noteForm!: FormGroup;
  isEdit = false;
  noteId = null;
  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth!: string;
  dialogInputData: any;

  constructor(
    private sharedNoteService: SharedNoteService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private media: MediaMatcher,
    public ref: DynamicDialogRef, private config: DynamicDialogConfig) {


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();

  }

  setDialogWidth() {
    this.dialogWidth = this.mobileQuery.matches ? '80%' : '40%';
  }

  ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('', [Validators.required]),
      color: new FormControl('#fff'),
      listType: new FormControl('select'),
      listItems: this.fb.array([]),
    });

    if (this.config?.data) {
      console.log(this.config.data);

      const data = this.config.data;
      this.dialogInputData = data;
      this.noteId = this.config.data._id;
      this.isEdit = true
      this.noteForm.patchValue({
        title: data.title,
        body: data.body,
        color: data.color,
        listType: data.listType,
      });

      console.log(this.noteForm.controls);


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

  get body() {
    return this.noteForm.get("body") as FormControl
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
    console.log(this.noteForm.value);

    this.ref.close(this.noteForm.value)

  }


  moveNote() {
    const ref = this.dialogService.open(MoveNoteDialogComponent, {
      header: 'Move Note',
      width: this.dialogWidth,
      contentStyle: { overflow: 'auto' },
      data: {}, // Pass available notebooks
      baseZIndex: 10000,
      dismissableMask: true

    });

    ref.onClose.subscribe((destinationNotebookId) => {
      if (destinationNotebookId) {
        // Implement the note moving functionality here
        // You can use the destinationNotebookId to update the note's destination.
        console.log('Destination Notebook ID:', destinationNotebookId);
      }
    });
  }


  shareNote() {

    const ref = this.dialogService.open(AccessInputEmailComponent, {
      header: 'Share Note',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      baseZIndex: 10000,
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
    });

    ref.onClose.subscribe((data) => {
      if (data) {


        const payload = {
          ...data,
          noteId: this.noteId
        }
        console.log(payload);

        this.sharedNoteService.shareNote(payload).subscribe(
          (response) => {

            console.log(response);


          },
          (error) => {
            console.log(error);

          }
        )

      }
    });

  }


}
