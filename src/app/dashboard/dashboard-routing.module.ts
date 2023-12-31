import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { PinboardComponent } from "./component/pinboard/pinboard.component";
import { NoteListComponent } from "./component/note-list/note-list.component";
import { RemainderComponent } from "./component/remainder/remainder.component";
import { NotebookpageComponent } from "./component/notebookpage/notebookpage.component";
import { SharedWithMeComponent } from "./component/shared-with-me/shared-with-me.component";

const dashboardRoutes: Routes = [
  // { path: 'pinned', component: PinboardComponent, pathMatch: 'full' },
  // { path: 'notes', component: NoteListComponent, pathMatch: 'full' },
  // { path: '', redirectTo: 'pinned', pathMatch: 'full' },

  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'remainder', component: RemainderComponent },
      { path: 'notebooks', component: NotebookpageComponent },
      { path: 'notebook/:id', component: NoteListComponent },
      { path: 'shared-with-me', component: SharedWithMeComponent },

      { path: '', component: PinboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],

})
export class DashboardRoutingModule { }