import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoupQualityComponent } from './soup-quality.component';

describe('SoupQualityComponent', () => {
  let component: SoupQualityComponent;
  let fixture: ComponentFixture<SoupQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoupQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoupQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
