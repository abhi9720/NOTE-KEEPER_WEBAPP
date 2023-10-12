import { TestBed } from '@angular/core/testing';

import { NotebookSelectionService } from './notebook-selection.service';

describe('NotebookSelectionService', () => {
  let service: NotebookSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
