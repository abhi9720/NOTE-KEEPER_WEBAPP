import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { DialogService } from 'primeng/dynamicdialog';
import Masonry from 'masonry-layout';
import { MediaMatcher } from '@angular/cdk/layout';

import { NoteService } from '../../service/note.service';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
import { DatePipe } from '@angular/common';
import { AccessInputEmailComponent } from '../access-input-email/access-input-email.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers: [DialogService],
})
export class NoteListComponent implements OnInit, AfterViewInit {
  currentDate: Date;
  masonry: any;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '40%';


  ngAfterViewInit() {
    this.masonry = new Masonry(this.el.nativeElement.querySelector('.masonry-container'), {
      itemSelector: '.note-card',
      // columnWidth: '250px',
      resize: true,

      percentPosition: true,
      // horizontalOrder: true,
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


  constructor(
    private media: MediaMatcher,
    private dialogService: DialogService,
    private notebookSelectionService: NotebookSelectionService,
    private noteService: NoteService,
    private datePipe: DatePipe,
    private el: ElementRef

  ) {
    this.currentDate = new Date();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  isMobileScreen = false;
  setDialogWidth() {
    this.isMobileScreen = this.mobileQuery.matches
    this.dialogWidth = this.mobileQuery.matches ? '90%' : '40%';
  }

  notes: any = [];
  filteredNotes: any[] = [];

  NotebookSelectedName = null;

  ngOnInit() {
    this.notebookSelectionService.selectedNotebook$.subscribe(selectedNotebook => {
      console.log(selectedNotebook);

      if (selectedNotebook) {
        this.NotebookSelectedName = selectedNotebook.name;
        this.noteService.getNotesByNotebookId(selectedNotebook.id).subscribe(notes => {

          this.notes = notes;
          this.filteredNotes = this.notes;

          this.refreshMasonryLayout()

        });


      } else {
        this.notes = [];
      }
    });
  }

  openNoteModal() {
    const ref = this.dialogService.open(AddUpdateNoteComponent, {
      header: 'Add Note',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      data: {},
      baseZIndex: 10000,
      dismissableMask: true

    });

    ref.onClose.subscribe((result) => {
      if (result) {
      }
    });
  }


  openNotebookShareDialog() {
    const ref = this.dialogService.open(AccessInputEmailComponent, {
      header: 'Share Notebook',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      baseZIndex: 10000,
      dismissableMask: true
    });

    ref.onClose.subscribe((recipientEmail) => {

      console.log(recipientEmail);

      if (recipientEmail) {
      }
    });
  }

  ImageUrl = {
    "Morning": "https://c4.wallpaperflare.com/wallpaper/532/857/84/5k-good-morning-mountain-hill-wallpaper-preview.jpg",
    "Noon": "https://c4.wallpaperflare.com/wallpaper/306/119/776/hawaii-haleakala-dawn-landscape-wallpaper-preview.jpg",
    "Night": "https://c4.wallpaperflare.com/wallpaper/800/831/598/digital-art-neon-mountains-lake-wallpaper-preview.jpg"
  }

  bgImageUrl = this.ImageUrl["Night"]

  getGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning!";
      this.bgImageUrl = this.ImageUrl["Morning"]
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon!";
      this.bgImageUrl = this.ImageUrl["Noon"]
    } else {
      greeting = "Good evening!";
      this.bgImageUrl = this.ImageUrl["Night"]

    }

    return greeting;
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

  searchNotes(event: any) {
    console.log(event,);

    const searchText = event.target.value;
    this.filteredNotes = this.notes.filter((note: any) => {
      return note.body.toLowerCase().includes(searchText.toLowerCase()) || note.title.toLowerCase().includes(searchText.toLowerCase());
    });
    this.refreshMasonryLayout()
  }


}