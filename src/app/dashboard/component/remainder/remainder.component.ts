import { Component, OnInit, ViewChild } from '@angular/core';
import { RemainderAddUpdateComponent } from '../remainder-add-update/remainder-add-update.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { NoteService } from '../../service/note.service';
import { CalendarEvent, CalendarEventAction, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { subMonths, addMonths, isSameDay } from 'date-fns';
import { ShownotificationService } from 'src/app/core/shownotification.service';
import { MessageService } from 'primeng/api';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';



const colors = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css'],
  providers: [DialogService, MessageService,
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    }
  ],



})

export class RemainderComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendar: any;

  isReminderModalOpen: boolean = false;
  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '50%';
  remainders: any = [];


  constructor(

    private media: MediaMatcher,
    private shownotificationService: ShownotificationService,
    private dialogService: DialogService, private noteService: NoteService) {

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
        this.initialzeEvents()
      },
      (error) => {
        console.log("Error ", error);
      }
    )
  }

  setDialogWidth() {
    this.dialogWidth = this.mobileQuery.matches ? '95%' : '50%';
  }



  openReminderModal(remainder: any = null) {
    const ref = this.dialogService.open(RemainderAddUpdateComponent, {
      header: 'Add Reminder',
      width: this.dialogWidth,
      data: remainder,
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
            this.remainders.push(response);
            console.log(this.remainders);

            this.initialzeEvents()
            this.refreshCalendar()
          },
          (error) => {
            console.log(error);
          }
        )
      }
    });
  }



  deleteRemainder(idx: any, remainder: any) {
    this.noteService.deleteNote(remainder._id).subscribe(
      (response) => {
        this.remainders.splice(idx, 1);
        console.log(this.remainders);

        this.initialzeEvents();
        this.refreshCalendar();

      },
      (error) => {
        this.shownotificationService.showMessage('', '', '')
      }
    )
  }

  editRemainder(id: any, remainder: any) {

    const ref = this.dialogService.open(RemainderAddUpdateComponent, {
      header: 'Update Reminder',
      width: this.dialogWidth,
      draggable: true,
      maximizable: true,
      data: remainder,
      autoZIndex: true,
      dismissableMask: true
    });

    ref.onClose.subscribe((data) => {

      if (data) {


        console.log(data);

        this.noteService.updateNote(remainder._id, data).subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.remainders[id] = res;
              console.log(id, this.remainders);
              this.initialzeEvents()
              this.refreshCalendar();

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



  view: CalendarView = CalendarView.Month; // You can change the default view as needed
  events: CalendarEvent[] = []; // Array to store your reminder notes as events

  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;


  initialzeEvents() {
    this.events = this.remainders.map((reminder: any, i: number) => {
      return {
        id: i,
        title: reminder.title,
        start: new Date(reminder.remainderDate),
        actions: this.actions,
        meta: reminder
        // You can set more properties like color, actions, etc. based on your requirements
      };
    });
  }



  dayClicked(event: any): void {
    if (this.view === CalendarView.Month) {
      const clickedDate = event.day.date;

      console.log(this.viewDate, clickedDate, isSameDay(this.viewDate, clickedDate));


      if (isSameDay(this.viewDate, clickedDate)) {
        this.activeDayIsOpen = !this.activeDayIsOpen;
      }
      else if (event.day.events.length == 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = clickedDate;

    }
  }



  refreshCalendar() {
    console.log(this.calendar);
    this.calendar.refresh.next();
  }

  goToToday() {
    this.viewDate = new Date();
    this.refreshCalendar();
  }

  goToPreviousMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
    this.refreshCalendar();
  }

  // Go to the next month
  goToNextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
    this.refreshCalendar();
  }


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt    mx-3"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        this.editRemainder(event.id, event.meta);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteRemainder(event.id, event.meta);

        this.activeDayIsOpen = false;
      },
    },
  ];
}
