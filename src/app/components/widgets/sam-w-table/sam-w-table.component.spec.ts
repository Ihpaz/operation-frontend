import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamWTableComponent } from './sam-w-table.component';

describe('SamWTableComponent', () => {
  let component: SamWTableComponent;
  let fixture: ComponentFixture<SamWTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamWTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamWTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
