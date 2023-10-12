import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { PinboardComponent } from "./component/pinboard/pinboard.component";

const dashboardRoutes: Routes = [
    { path: '',  component: PinboardComponent,pathMatch: 'full' },
    { path: 'notes',  component: DashboardComponent,pathMatch: 'full' },

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],
    
  })
  export class DashboardRoutingModule {}