import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveNoteDialogComponent } from './move-note-dialog.component';

describe('MoveNoteDialogComponent', () => {
  let component: MoveNoteDialogComponent;
  let fixture: ComponentFixture<MoveNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveNoteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
