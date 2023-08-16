import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocDaytodayDashboardComponent } from './soup-quality-dashboard.component';

describe('VocDaytodayDashboardComponent', () => {
  let component: VocDaytodayDashboardComponent;
  let fixture: ComponentFixture<VocDaytodayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocDaytodayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocDaytodayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
