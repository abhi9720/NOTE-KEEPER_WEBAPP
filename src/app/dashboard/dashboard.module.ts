import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotebookListComponent } from './component/notebook-list/notebook-list.component';
import { NoteListComponent } from './component/note-list/note-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NoteComponent } from './component/note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUpdateNoteComponent } from './component/add-update-note/add-update-note.component';
import { ModelComponent } from './component/model/model.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { NotebookInputComponent } from './component/notebook-input/notebook-input.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CardModule } from 'primeng/card';
import { AccessInputEmailComponent } from './component/access-input-email/access-input-email.component';
import { MoveNoteDialogComponent } from './component/move-note-dialog/move-note-dialog.component';
import { MenuModule } from 'primeng/menu';
import { PinboardComponent } from './component/pinboard/pinboard.component';
import { RemainderAddUpdateComponent } from './component/remainder-add-update/remainder-add-update.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NoteListComponent,
    NotebookListComponent,
    PinboardComponent,
    NoteComponent,
    AddUpdateNoteComponent,
    ModelComponent,
    NotebookInputComponent,
    AccessInputEmailComponent,
    MoveNoteDialogComponent,
    RemainderAddUpdateComponent
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SpeedDialModule,
    DynamicDialogModule,
    ButtonModule,
    ScrollTopModule,
    CardModule,
    DropdownModule,
    MenuModule,
    DividerModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,

  ],
})
export class DashboardModule { }
