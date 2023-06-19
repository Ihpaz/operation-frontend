import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaWTableComponent } from './sa-w-table.component';

describe('SaWTableComponent', () => {
  let component: SaWTableComponent;
  let fixture: ComponentFixture<SaWTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaWTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaWTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
