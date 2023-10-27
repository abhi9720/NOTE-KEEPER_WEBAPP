import { Component } from '@angular/core';

@Component({
  selector: 'app-notebookpage',
  templateUrl: './notebookpage.component.html',
  styleUrls: ['./notebookpage.component.css']
})
export class NotebookpageComponent {

  notebooks: any = [
    {
      "_id": "652c164ad2c20f281e3a1309",
      "name": "Project task",
      "createdBy": "652a7cd45c08ca3d64ec0cff",
      "__v": 1,
      "sharedWith": []
    },
    {
      "_id": "653041cfa3c1091e4327135c",
      "name": "new book ",
      "createdBy": "652a7cd45c08ca3d64ec0cff",
      "__v": 1,
      "sharedWith": []
    },
    {
      "_id": "6537842288950b9f6a682d14",
      "name": "new",
      "createdBy": "652a7cd45c08ca3d64ec0cff",
      "sharedWith": [],
      "__v": 0
    }
  ]
}
