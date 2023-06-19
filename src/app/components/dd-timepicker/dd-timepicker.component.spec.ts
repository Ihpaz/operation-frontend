import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdTimepickerComponent } from './dd-timepicker.component';

describe('DdTimepickerComponent', () => {
  let component: DdTimepickerComponent;
  let fixture: ComponentFixture<DdTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdTimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
