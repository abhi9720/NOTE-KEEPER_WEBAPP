import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateNoteComponent } from './add-update-note.component';

describe('AddUpdateNoteComponent', () => {
  let component: AddUpdateNoteComponent;
  let fixture: ComponentFixture<AddUpdateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
