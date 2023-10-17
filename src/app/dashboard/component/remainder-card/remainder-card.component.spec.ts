import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderCardComponent } from './remainder-card.component';

describe('RemainderCardComponent', () => {
  let component: RemainderCardComponent;
  let fixture: ComponentFixture<RemainderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemainderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemainderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
