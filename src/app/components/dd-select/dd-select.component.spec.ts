import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdSelectComponent } from './dd-select.component';

describe('DdSelectComponent', () => {
  let component: DdSelectComponent;
  let fixture: ComponentFixture<DdSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
