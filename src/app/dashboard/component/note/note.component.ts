import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
 import { NoteService } from '../../service/note.service';
import { AccessInputEmailComponent } from '../access-input-email/access-input-email.component';
import { MoveNoteDialogComponent } from '../move-note-dialog/move-note-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnChanges {
  @Input() note: any;
  @Output() checkboxClicked = new EventEmitter<any>();
  noteClass: string = '';

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '40%';

  constructor( private dialogService: DialogService,
    private noteService : NoteService,  
      private media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.setDialogWidth();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
      this.setDialogWidth();
      
  }

  ngOnChanges() {
    this.selectColor();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
  

  setDialogWidth() {
    
    
    this.dialogWidth = this.mobileQuery.matches ? '90%' : '40%';
  }
  
  

  selectColor() {
    this.noteClass = this.note.color // Set the dynamic class
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleCheckbox(itemIndex: number) {
     
    console.log(this.note.listItems , itemIndex);
    
    const checkboxItem = {
      noteId: this.note.id, // Assuming 'id' is the unique identifier for a note
      listItemIndex: itemIndex,
      checked: !this.note.listItems[itemIndex].checked,
    };
    this.checkboxClicked.emit(checkboxItem);
    this.note.listItems[itemIndex].checked = !this.note.listItems[itemIndex].checked
  }

  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editNote(){

    
      const ref = this.dialogService.open(AddUpdateNoteComponent, {
        header: 'Update Note',
         width: this.dialogWidth,
        draggable:true,
        maximizable:true,
        data: this.note, 
        baseZIndex: 10000, 
      });
  
      ref.onClose.subscribe((result) => {
        if (result) {
          // Handle the result (updated or new note) here
        }
      });
    

  }

  deleteNote(){

  }

  shareNote(){

    const ref = this.dialogService.open(AccessInputEmailComponent, {
      header: 'Share Note',
       width: this.dialogWidth,
      draggable: true,
      maximizable: true,
     
      baseZIndex: 10000,
    });
    
    ref.onClose.subscribe((recipientEmail) => {
      if (recipientEmail) {
        alert(recipientEmail);
        
         this.noteService.shareNote(this.note.id, recipientEmail).subscribe((response) => {
          if (response.success) {
            // Handle success, e.g., show a confirmation message
          } else {
            // Handle error, e.g., show an error message
          }
        });
      }
    });
    
  }


  moveNote() {
    const ref = this.dialogService.open(MoveNoteDialogComponent, {
      header: 'Move Note',
       width: this.dialogWidth,
      data: {  }, // Pass available notebooks
      baseZIndex: 10000,
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
