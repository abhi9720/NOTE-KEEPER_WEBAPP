import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderAddUpdateComponent } from './remainder-add-update.component';

describe('RemainderAddUpdateComponent', () => {
  let component: RemainderAddUpdateComponent;
  let fixture: ComponentFixture<RemainderAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemainderAddUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemainderAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
