import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DialogService } from 'primeng/dynamicdialog';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
import { NoteService } from '../../service/note.service';
import { AccessInputEmailComponent } from '../access-input-email/access-input-email.component';
import { MoveNoteDialogComponent } from '../move-note-dialog/move-note-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotebookSelectionService } from '../../service/notebook-selection.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [ConfirmationService]
})
export class NoteComponent implements OnChanges {
  @Input() note: any;
  @Output() deleteNoteEmitter = new EventEmitter<any>();

  noteClass: string = '';

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '40%';
  renderedContent!: SafeHtml;

  constructor(private dialogService: DialogService,
    private noteService: NoteService,
    private media: MediaMatcher,
    private confirmationService: ConfirmationService,
    private notebookSelectionService: NotebookSelectionService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();

  }

  sanitizeHtml() {
    this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(this.note.body);
  }

  ngOnChanges() {
    this.selectColor();
    this.sanitizeHtml()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }


  setDialogWidth() {
    this.dialogWidth = this.mobileQuery.matches ? '95%' : '40%';
  }



  selectColor() {
    this.noteClass = this.note.color // Set the dynamic class
  }

  closeMenu() {
    this.isMenuOpen = false;
  }


  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  toggleCheckbox(listItemIndex: number) {

    const checked = !this.note.listItems[listItemIndex].checked;

    const requestBody = {
      listItemIndex,
      checked,
    };

    // Make an HTTP POST request to update the list item.
    this.noteService.updateNoteCheckBox(this.note._id, requestBody).subscribe(
      (response) => {
        if (response)
          this.note = response
        this.showMessage('info', 'Information', 'Checkbox Updated')

      },
      (error) => {
        console.log(error);
      }
    )
  }

  pinClicked() {

    // this.pinClicked.emit(this.note._id)


    this.noteService.pinNote(this.note._id).subscribe(
      (response) => {
        this.showMessage('success', 'Success', 'Card Pinned')

        this.note = response
      },
      (error) => {
        console.log(error);

      }

    )
  }

  isMenuOpen = false;

  OpenMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editNote() {


    const ref = this.dialogService.open(AddUpdateNoteComponent, {
      header: 'Update Note',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      data: this.note,
      autoZIndex: true,
      dismissableMask: true
    });

    ref.onClose.subscribe((data) => {
      if (data) {


        console.log(data);

        this.noteService.updateNote(data._id, data).subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.note = res;
              console.log(this.note);
              this.sanitizeHtml()
            }
            this.showMessage('info', 'Information', 'Note Updated')
          },
          (err) => {
            this.showMessage('error', 'Error', 'Failed to Update Note')

          }

        )
      }


    });


  }

  deleteNote() {
    console.log("delete");

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this note?',
      accept: () => {
        this.noteService.deleteNote(this.note._id).subscribe(
          (response) => {
            console.log(this.deleteNoteEmitter);

            this.deleteNoteEmitter.emit()
            this.showMessage('info', 'Information', 'Note Deleted')
          }
          , (error) => {
            console.log("Error", error);
            this.showMessage('error', 'Error', 'Failed to Delete Note')
          }
        )
      },
      reject: () => {
        // User canceled
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
      dismissableMask: true

    });

    ref.onClose.subscribe((recipientEmail) => {
      if (recipientEmail) {


        // this.noteService.shareNote(this.note.id, recipientEmail).subscribe((response) => {
        //   if (response.success) {
        //     // Handle success, e.g., show a confirmation message
        //   } else {
        //     // Handle error, e.g., show an error message
        //   }
        // });
      }
    });

  }


  moveNote() {
    const ref = this.dialogService.open(MoveNoteDialogComponent, {
      header: 'Move Note',
      width: this.dialogWidth,
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


}
