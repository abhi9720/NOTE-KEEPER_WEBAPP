import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessInputEmailComponent } from './access-input-email.component';

describe('AccessInputEmailComponent', () => {
  let component: AccessInputEmailComponent;
  let fixture: ComponentFixture<AccessInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessInputEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
