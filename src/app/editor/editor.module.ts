import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RichTextEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons

          [{ list: "ordered" }, { list: "bullet" }],

          ["link"], // link and image, video
        ],
      },
    }),
  ],
  exports: [RichTextEditorComponent]
})
export class EditorModule { }
