import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NoteService {



    private apiUrl = 'your-api-url';

    dummyNotebookNames = [
        { id: 1, name: 'Notebook 1' },
        { id: 2, name: 'Notebook 2' },
    ];

    dummyNotes = [
        {
            "id": 1,
            "title": "Sample Title",
            "color": 'rgb(254 205 211)',
            "body": "In the updateCheckbox function in the NoteListComponent, you should expect an object as the parameter, not individual variables for noteId, listItemIndex, and checked. In the updateCheckbox function in the NoteListComponent, you should expect an object as the parameter, not individual variables for noteId, listItemIndex, and checked. ",
            "listType": "",

        },
        {
            "id": 2,
            "title": "Sample Title",
            "color": 'rgb(254 243 199)',
            "body": "Sample Body Text",
            "listType": "checkbox",
            "listItems": [


                {
                    "label": "Task 1",
                    "checked": false
                },
                {
                    "label": "Task 2",
                    "checked": true
                },

                {
                    "label": "Step X",
                    "checked": true
                },
                {
                    "label": "Step Y",
                    "checked": false
                }



            ]
        },
        {
            "id": 3,
            "title": "Sample Title",
            "color": 'rgb(249 168 212)',
            "body": "Sample Body Text Sample Body Text Sample Body Text",
            "listType": "checkbox",
            "listItems": [


                {
                    "label": "Task 1",
                    "checked": false
                },
                {
                    "label": "Task 2",
                    "checked": true
                },

                {
                    "label": "Step X",
                    "checked": true
                },
                {
                    "label": "Step Y",
                    "checked": false
                }



            ]
        }
        ,
        {
            "id": 4,
            "title": "Sample Title",
            "color": 'rgb(224 231 255)',
            "body": "Sample Body Text",
            "listType": "bullet",
            "listItems": [


                {
                    "label": "Task 1",
                    "checked": false
                },
                {
                    "label": "Task 2",
                    "checked": false
                },

                {
                    "label": "Step X",
                    "checked": false
                },
                {
                    "label": "Step Y",
                    "checked": false
                }



            ]
        }
        ,
        {
            "id": 5,
            "title": "Sample Title",
            "color": 'rgb(254 243 199)',
            "body": "Sample Body Text",
            "listType": "checkbox",
            "listItems": [


                {
                    "label": "Task 1",
                    "checked": false
                },
                {
                    "label": "Task 2",
                    "checked": true
                },

                {
                    "label": "Step X",
                    "checked": true
                },
                {
                    "label": "Step Y",
                    "checked": false
                }



            ]
        },
        {
            "id": 6,
            "title": "Sample Title",
            "color": 'rgb(204 251 241)',
            "body": "Sample Body Text",
            "listType": "checkbox",
            "listItems": [


                {
                    "label": "Task 1",
                    "checked": false
                },
                {
                    "label": "Task 2",
                    "checked": true
                },

                {
                    "label": "Step X",
                    "checked": true
                },
                {
                    "label": "Step Y",
                    "checked": false
                }



            ]
        }

    ];

    addNotebook(newNotebookName: string): Observable<any> {
        const newnotebook = { id: Math.random() * 20, name: newNotebookName };
        // this.dummyNotebookNames.push(newnotebook);
        return of(newnotebook)
    }

    constructor(private http: HttpClient) { }

    getNotebookNames(): Observable<any[]> {


        return of(this.dummyNotebookNames);
    }

    getPinNotes() {
        return of(this.dummyNotes);
    }

    getNotesByNotebookId(notebookId: number): Observable<any> {
        // const url = `${this.apiUrl}/notes?notebookId=${notebookId}`; 

        // return this.http.get<any>(url);


        return of(this.dummyNotes);

    }


    shareNote(noteId: string, recipientEmail: string): Observable<any> {
        const url = `${this.apiUrl}/notes/${noteId}/share`; // Adjust the API endpoint accordingly

        // You can send a POST request to the server to share the note
        const requestBody = {
            recipientEmail: recipientEmail,
        };

        return this.http.post(url, requestBody);
    }
}
