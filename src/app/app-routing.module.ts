import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  // Define routes for each module
  { path: 'auth', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => DashboardModule },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
