import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(this.authService.isLoggedIn());

    if (this.authService.isLoggedIn()) {
      // User is logged in, redirect to "/dashboard" if trying to access the root route
      // if ( === '/' || state.url === '') {
      //   this.router.navigate(['/dashboard']);
      //   return false; // Prevent access to the root route
      // }
      // /dashboard
      console.log(state.url);

      return true; // Allow access to other routes
    } else {
      // User is not logged in, allow access to the root route
      this.router.navigate(['/auth'])
      return false;
    }
  }

}
