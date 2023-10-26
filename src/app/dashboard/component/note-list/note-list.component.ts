import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NotebookSelectionService } from '../../service/notebook-selection.service';
import { DialogService } from 'primeng/dynamicdialog';
import Masonry from 'masonry-layout';
import { MediaMatcher } from '@angular/cdk/layout';

import { NoteService } from '../../service/note.service';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
import { AccessInputEmailComponent } from '../access-input-email/access-input-email.component';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from '../../service/notebook.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers: [DialogService, MessageService],
})
export class NoteListComponent implements OnInit, AfterViewInit {

  currentDate: Date;
  masonry: any;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '40%';


  isEditing: boolean = false;
  isMobileScreen = false;

  notes: any = [];
  filteredNotes: any[] = [];

  NotebookSelected !: any;

  constructor(
    private media: MediaMatcher,
    private dialogService: DialogService,
    private notebookSelectionService: NotebookSelectionService,
    private noteService: NoteService,
    private notebookService: NotebookService,
    private el: ElementRef,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) {
    this.currentDate = new Date();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();
  }


  ngAfterViewInit() {
    this.masonry = new Masonry(this.el.nativeElement.querySelector('.masonry-container'), {
      itemSelector: '.note-card',
      // columnWidth: '250px',
      resize: true,
      percentPosition: true,
      // horizontalOrder: true,
    });
    console.log(this.masonry);
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {

        this.notebookService.getNotebookById(id).subscribe(
          (notebook) => {
            this.NotebookSelected = notebook;
            console.log(this.NotebookSelected);

            this.notebookSelectionService.selectNotebook(notebook);

            this.noteService.getNotesByNoteBook(id).subscribe(
              (notes: any) => {

                this.notes = notes;
                this.filteredNotes = this.notes;
                console.log(this.notes);
                this.refreshMasonryLayout()

              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {

          }


        )


      }
    });

    // this.notebookSelectionService.selectedNotebook$.subscribe(selectedNotebook => {
    //   console.log(selectedNotebook);

    //   if (selectedNotebook) {
    //     console.log(selectedNotebook);

    //     this.NotebookSelectedId = selectedNotebook._id;
    //     this.NotebookSelectedName = selectedNotebook.name;



    //   } else {
    //     this.notes = [];
    //     this.filteredNotes = [];
    //   }
    // });
  }


  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  refreshMasonryLayout() {

    if (this.masonry) {
      setTimeout(() => {
        this.masonry.reloadItems()
        this.masonry.layout();
      }, 100);
    }
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }


  setDialogWidth() {
    this.isMobileScreen = this.mobileQuery.matches
    this.dialogWidth = this.mobileQuery.matches ? '95%' : '40%';
  }





  openNoteModal() {

    const ref = this.dialogService.open(AddUpdateNoteComponent, {
      header: 'Add Note',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      data: {},
      autoZIndex: true,
      dismissableMask: true
    });

    ref.onClose.subscribe((data) => {
      console.log(data);
      data.notebookId = this.notebookSelectionService.getLastSelectedNotebook()._id;
      if (data) {
        console.log(data);

        this.noteService.createNote(data).subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.notes.push(res);
              this.filteredNotes = this.notes;
              this.refreshMasonryLayout()
            }
            this.showMessage('info', 'Information', 'Note Created')
          },
          (err) => {
            this.showMessage('error', 'Error', 'Failed to Create Note')

          }

        )
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


  deleteNote(noteId: any, idx: number) {
    this.filteredNotes.splice(idx, 1);
    this.refreshMasonryLayout()
  }

  updateCheckbox(checkboxItem: any, idx: any) {

    const { noteId, listItemIndex, checked } = checkboxItem;

    console.log(noteId, listItemIndex, checked);

    const requestBody = {
      listItemIndex: listItemIndex,
      checked: checked,
    };

    // Make an HTTP POST request to update the list item.
    this.noteService.updateNoteCheckBox(noteId, requestBody).subscribe(
      (response) => {
        if (response)
          this.filteredNotes[idx] = response
        this.showMessage('info', 'Information', 'Checkbox Updated')

      },
      (error) => {
        console.log(error);

      }
    )
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