import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocDashboardComponent } from './voc-dashboard.component';

describe('VocDashboardComponent', () => {
  let component: VocDashboardComponent;
  let fixture: ComponentFixture<VocDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
