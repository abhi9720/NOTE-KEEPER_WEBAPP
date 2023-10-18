import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() placeholder: any = ''
  quillConfiguration = QuillConfiguration;




  constructor() {



  }
  ngOnInit() {
    this.control = this.control ?? new FormControl()
  }
}


export const QuillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
}