import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [

  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'dashboard', loadChildren: () => DashboardModule, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
