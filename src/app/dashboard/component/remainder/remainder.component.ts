import { Component } from '@angular/core';
import { RemainderAddUpdateComponent } from '../remainder-add-update/remainder-add-update.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css'],
  providers: [DialogService],

})
export class RemainderComponent {


  isReminderModalOpen: boolean = false;
  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '50%';

  constructor(private media: MediaMatcher, private dialogService: DialogService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setDialogWidth();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setDialogWidth();

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

    ref.onClose.subscribe((result) => {
      if (result) {
        // Handle the result if needed
      }
    });
  }
}
