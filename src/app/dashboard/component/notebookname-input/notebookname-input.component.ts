import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NotebookService } from '../../service/notebook.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-notebookname-input',
  templateUrl: './notebookname-input.component.html',
  styleUrls: ['./notebookname-input.component.css'],
  providers: [ConfirmationService]

})
export class NotebooknameInputComponent implements OnInit {
  @ViewChild('notebookNameInput') set notebookNameInputElement(content: ElementRef) {
    this.notebookNameInput = content;
    if (this.notebookNameInput) {
      this.notebookNameInput.nativeElement.focus();
      this.changeDetectorRef.detectChanges();
    }
  }
  private notebookNameInput: ElementRef | undefined;

  @Input() Notebook: any;
  @Output() deleteNoteBookEmitter = new EventEmitter();
  @Output() updateNoteBookEmitter = new EventEmitter();
  NotebookName: any;
  NotebookId: any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private notebookService: NotebookService,
    private changeDetectorRef: ChangeDetectorRef) {


  }

  isEditing: boolean = false;

  ngOnInit() {
    this.NotebookName = this.Notebook.name;
    this.NotebookId = this.Notebook._id;
  }



  toggleEditing(event: Event) {
    event.stopPropagation();
    this.isEditing = !this.isEditing;
  }


  onInputBlur() {
    this.isEditing = !this.isEditing;

    const data = {
      name: this.NotebookName
    }

    this.notebookService.updateNotebook(this.NotebookId, data).subscribe(
      (response) => {
        this.Notebook = response;
        this.updateNoteBookEmitter.emit(response)
        console.log("Updated ", response);
      },
      (error) => {
        console.log(error);
      }
    )
  }



  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }


  showConfirmation: boolean = false;
  confirmationInput: string = '';


  showConfirmationDialog(event: Event) {
    event.stopPropagation();

    this.showConfirmation = true;
  }

  closeConfirmationDialog(event: any) {
    event?.stopPropagation();

    this.showConfirmation = false;
  }

  confirmDelete(event: any) {
    event?.stopPropagation();


    this.triggerDeleteNoteBook()
    this.closeConfirmationDialog(null);

  }



  triggerDeleteNoteBook() {
    this.deleteNoteBookEmitter.emit(this.Notebook._id)
  }


}
