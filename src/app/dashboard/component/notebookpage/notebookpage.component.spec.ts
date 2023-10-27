import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookpageComponent } from './notebookpage.component';

describe('NotebookpageComponent', () => {
  let component: NotebookpageComponent;
  let fixture: ComponentFixture<NotebookpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebookpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebookpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
