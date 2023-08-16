import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoupQualityDetailComponent } from './soup-quality-detail.component';

describe('SoupQualityDetailComponent', () => {
  let component: SoupQualityDetailComponent;
  let fixture: ComponentFixture<SoupQualityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoupQualityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoupQualityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
