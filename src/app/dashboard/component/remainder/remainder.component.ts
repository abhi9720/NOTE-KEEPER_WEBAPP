import { Component } from '@angular/core';
import { RemainderAddUpdateComponent } from '../remainder-add-update/remainder-add-update.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css'],
  providers: [DialogService],

})
export class RemainderComponent {


  isReminderModalOpen: boolean = false;


  constructor(private dialogService: DialogService) { }

  openReminderModal() {
    const ref = this.dialogService.open(RemainderAddUpdateComponent, {
      header: 'Add Reminder', // You can customize the header
      width: '40%',
      draggable: true,
      maximizable: true,
      data: {},
      baseZIndex: 10000,
      dismissableMask: true

    });

    ref.onClose.subscribe((result) => {
      if (result) {
        // Handle the result if needed
      }
    });
  }
}
