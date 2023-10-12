// pinboard.component.ts

import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../service/note.service';
import { DialogService } from 'primeng/dynamicdialog';
 
@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.css'],
  providers: [DialogService], 
})
export class PinboardComponent implements OnInit {
  pinnedNotes: any = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getPinNotes().subscribe((notes) => {
      this.pinnedNotes = notes;
    });
  }

  
  updateCheckbox(checkboxItem:any) {

    
    
    const { noteId, listItemIndex, checked } = checkboxItem;

    console.log(noteId,listItemIndex,checked);
    
     const requestBody = {
      listItemIndex: listItemIndex,
      checked: checked,
    };

    // Make an HTTP POST request to update the list item.
    // this.http
    //   .post(`/notes/${noteId}/update-list-item`, requestBody)
    //   .subscribe((response) => {
    //     // Handle the response, such as updating the local data.
    //     // You can choose to update the local data here if needed.
    //   });
  }
}
