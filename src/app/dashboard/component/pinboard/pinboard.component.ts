import { Component, ElementRef, OnInit } from '@angular/core';
import { NoteService } from '../../service/note.service';
import { DialogService } from 'primeng/dynamicdialog';
import Masonry from 'masonry-layout';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.css'],
  providers: [DialogService],
})
export class PinboardComponent implements OnInit {
  pinnedNotes: any = [];
  masonry: any;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private noteService: NoteService,
    private el: ElementRef,
    private media: MediaMatcher,

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

  }


  isMobileScreen = false;
  setDialogWidth() {
    this.isMobileScreen = this.mobileQuery.matches
  }

  ngOnInit() {
    this.noteService.getPinNotes().subscribe((notes) => {
      this.pinnedNotes = notes;
    });
  }

  removeNote(event: any, idx: number) {
    alert("remove note" + idx)
    this.pinnedNotes.splice(1, idx)

    console.log(this.pinnedNotes);

  }




  ngAfterViewInit() {
    this.masonry = new Masonry(this.el.nativeElement.querySelector('.masonry-container'), {
      itemSelector: '.note-card',
      // columnWidth: '250px',
      resize: true,

      percentPosition: true,
      horizontalOrder: true,
    });
  }


  refreshMasonryLayout() {
    console.log(this.masonry);

    if (this.masonry) {
      setTimeout(() => {
        this.masonry.reloadItems()
        this.masonry.layout();
      }, 100);
    }
  }


  updateCheckbox(checkboxItem: any) {
    const { noteId, listItemIndex, checked } = checkboxItem;

    console.log(noteId, listItemIndex, checked);

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
