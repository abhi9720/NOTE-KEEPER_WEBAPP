import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookInputComponent } from './notebook-input.component';

describe('NotebookInputComponent', () => {
  let component: NotebookInputComponent;
  let fixture: ComponentFixture<NotebookInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebookInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebookInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
