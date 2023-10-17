import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-remainder-card',
  templateUrl: './remainder-card.component.html',
  styleUrls: ['./remainder-card.component.css']
})
export class RemainderCardComponent {

  @Input() remainder!: any;


  isMenuOpen = false;
  OpenMenu() {
    this.isMenuOpen = true
  }

  closeMenu() {
    this.isMenuOpen = false
  }

  deleteRemainder() {

  }

  editRemainder() {

  }

}
