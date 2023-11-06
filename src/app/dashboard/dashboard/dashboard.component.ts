import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {

  sidebarHidden = false;

  childComponent!: any;


  mobileQuery!: MediaQueryList;
  private mobileQueryListener: () => void;
  dialogWidth = '50%';

  constructor(private media: MediaMatcher, private router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.isMobileScreen();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.isMobileScreen()
  }

  isMobileScreen() {
    this.isMobile = this.mobileQuery.matches;;
    return this.sidebarHidden = this.mobileQuery.matches;
  }

  isMobile = false;


  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;

    console.log("refresh layout");


    this.childComponent.refreshMasonryLayout();

  }


  showNoteBooks = false;

  toggleNoteBookList(value: boolean) {
    this.showNoteBooks = value;
  }

  isActive(route: string): boolean {

    return this.router.url === route;
  }

  onActivate(componentRef: any) {
    this.childComponent = componentRef;

  }

}
