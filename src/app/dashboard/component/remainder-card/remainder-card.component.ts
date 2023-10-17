import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteService } from '../../service/note.service';
import { MessageService } from 'primeng/api';
import { ShownotificationService } from 'src/app/core/shownotification.service';
import { DialogService } from 'primeng/dynamicdialog';
import { RemainderAddUpdateComponent } from '../remainder-add-update/remainder-add-update.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-remainder-card',
  templateUrl: './remainder-card.component.html',
  styleUrls: ['./remainder-card.component.css'],
  providers: [MessageService]
})
export class RemainderCardComponent {

  @Input() remainder!: any;
  @Output() deleteRemainderEmitter = new EventEmitter<any>();


  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '40%';

  constructor(private noteService: NoteService,
    private dialogService: DialogService,
    private media: MediaMatcher,
    private shownotificationService: ShownotificationService) {


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();

  }


  setDialogWidth() {
    this.dialogWidth = this.mobileQuery.matches ? '95%' : '40%';
  }

  isMenuOpen = false;
  OpenMenu() {
    this.isMenuOpen = true
  }

  closeMenu() {
    this.isMenuOpen = false
  }

  deleteRemainder() {
    this.noteService.deleteNote(this.remainder._id).subscribe(
      (response) => {
        // emit event to remove from remainder array also
        this.deleteRemainderEmitter.emit()
      },
      (error) => {
        this.shownotificationService.showMessage('', '', '')
      }
    )
  }

  editRemainder() {

    const ref = this.dialogService.open(RemainderAddUpdateComponent, {
      header: 'Update Reminder',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      data: this.remainder,
      autoZIndex: true,
      dismissableMask: true
    });

    ref.onClose.subscribe((data) => {
      this.closeMenu()
      if (data) {


        console.log(data);

        this.noteService.updateNote(this.remainder._id, data).subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.remainder = res;
              console.log(this.remainder);

            }
            this.shownotificationService.showMessage('info', 'Information', 'Note Updated')
          },
          (err) => {
            this.shownotificationService.showMessage('error', 'Error', 'Failed to Update Note')

          }

        )
      }


    });

  }

}
