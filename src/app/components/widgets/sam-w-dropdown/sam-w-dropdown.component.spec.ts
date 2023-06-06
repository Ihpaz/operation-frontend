import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamWDropdownComponent } from './sam-w-dropdown.component';

describe('SamWDropdownComponent', () => {
  let component: SamWDropdownComponent;
  let fixture: ComponentFixture<SamWDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamWDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamWDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
