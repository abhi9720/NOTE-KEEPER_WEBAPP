import { Component, ViewChild } from '@angular/core';
import { NoteListComponent } from '../component/note-list/note-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sidebarHidden = false;
  @ViewChild(NoteListComponent, { static: false })
  noteListComponent!: NoteListComponent;

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;

    if (this.noteListComponent) {
      // controlling layour of notelistcomponent
      this.noteListComponent.refreshMasonryLayout();
    }
  }
}
