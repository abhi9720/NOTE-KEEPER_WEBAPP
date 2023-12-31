import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedWithMeComponent } from './component/shared-with-me/shared-with-me.component';
import { NotebookListComponent } from './component/notebook-list/notebook-list.component';
import { NoteListComponent } from './component/note-list/note-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NoteComponent } from './component/note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUpdateNoteComponent } from './component/add-update-note/add-update-note.component';
import { ModelComponent } from './component/model/model.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { NotebookInputComponent } from './component/notebook-input/notebook-input.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { AccessInputEmailComponent } from './component/access-input-email/access-input-email.component';
import { MoveNoteDialogComponent } from './component/move-note-dialog/move-note-dialog.component';
import { MenuModule } from 'primeng/menu';
import { PinboardComponent } from './component/pinboard/pinboard.component';
import { RemainderAddUpdateComponent } from './component/remainder-add-update/remainder-add-update.component';
import { RemainderComponent } from './component/remainder/remainder.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { RemainderCardComponent } from './component/remainder-card/remainder-card.component';
import { ShownotificationService } from '../core/shownotification.service';
import { EditorModule } from '../editor/editor.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotebooknameInputComponent } from './component/notebookname-input/notebookname-input.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NotebookpageComponent } from './component/notebookpage/notebookpage.component';
import { MomentModule } from 'angular2-moment';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


import { CalendarModule as AngularCalender, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [

    DashboardComponent,
    NoteListComponent,
    SharedWithMeComponent,
    PinboardComponent,
    NoteComponent,
    AddUpdateNoteComponent,
    ModelComponent,
    NotebookInputComponent,
    AccessInputEmailComponent,
    MoveNoteDialogComponent,
    RemainderAddUpdateComponent,
    RemainderComponent,
    NotebookListComponent,
    RemainderCardComponent,
    NavbarComponent,
    NotebooknameInputComponent,
    NotebookpageComponent
  ],
  imports: [
    AutoCompleteModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SpeedDialModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    ScrollTopModule,
    CardModule,
    DropdownModule,
    MenuModule,
    DividerModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CalendarModule,
    MessagesModule,
    ToastModule,
    EditorModule,
    MomentModule,
    AvatarModule,
    AvatarGroupModule,
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),
    AngularCalender.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [
    DatePipe,
    ShownotificationService
  ],
})
export class DashboardModule { }
