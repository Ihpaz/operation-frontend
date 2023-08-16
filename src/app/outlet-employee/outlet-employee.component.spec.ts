import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletEmployeeComponent } from './outlet-employee.component';

describe('OutletEmployeeComponent', () => {
  let component: OutletEmployeeComponent;
  let fixture: ComponentFixture<OutletEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
