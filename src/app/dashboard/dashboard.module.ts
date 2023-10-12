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

import { CardModule } from 'primeng/card';
 import { AccessInputEmailComponent } from './component/access-input-email/access-input-email.component';
import { MoveNoteDialogComponent } from './component/move-note-dialog/move-note-dialog.component';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    DashboardComponent,
    NoteListComponent,
    NotebookListComponent,
    NoteComponent,
    AddUpdateNoteComponent,
    ModelComponent,
    NotebookInputComponent,
    NoteComponent,
    AccessInputEmailComponent,
         MoveNoteDialogComponent
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
    DividerModule
  ] ,
  providers: [
    DatePipe,
  
  ],
})
export class DashboardModule { }
