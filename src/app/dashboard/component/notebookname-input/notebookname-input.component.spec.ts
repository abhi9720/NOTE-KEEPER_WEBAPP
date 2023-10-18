import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebooknameInputComponent } from './notebookname-input.component';

describe('NotebooknameInputComponent', () => {
  let component: NotebooknameInputComponent;
  let fixture: ComponentFixture<NotebooknameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebooknameInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebooknameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
