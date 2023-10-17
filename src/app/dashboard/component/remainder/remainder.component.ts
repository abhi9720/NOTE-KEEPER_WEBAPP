import { Component, OnInit } from '@angular/core';
import { RemainderAddUpdateComponent } from '../remainder-add-update/remainder-add-update.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css'],
  providers: [DialogService],

})
export class RemainderComponent implements OnInit {


  isReminderModalOpen: boolean = false;
  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '50%';
  remainders: any = [];


  constructor(private media: MediaMatcher, private dialogService: DialogService, private noteService: NoteService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();

  }

  ngOnInit(): void {
    this.noteService.getRemainder().subscribe(
      (response) => {
        this.remainders = response;
        console.log(response);
      },
      (error) => {
        console.log("Error ", error);
      }
    )
  }

  setDialogWidth() {
    this.dialogWidth = this.mobileQuery.matches ? '95%' : '50%';
  }

  openReminderModal() {
    const ref = this.dialogService.open(RemainderAddUpdateComponent, {
      header: 'Add Reminder',
      width: this.dialogWidth,
      closable: true,
      draggable: true,
      maximizable: true,
      autoZIndex: true,
      dismissableMask: true

    });

    ref.onClose.subscribe((remainder) => {
      if (remainder) {
        this.noteService.createNote(remainder).subscribe(
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
