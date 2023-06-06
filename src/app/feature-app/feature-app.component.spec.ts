import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAppComponent } from './feature-app.component';

describe('FeatureAppComponent', () => {
  let component: FeatureAppComponent;
  let fixture: ComponentFixture<FeatureAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
