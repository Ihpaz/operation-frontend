import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocNegatifComponent } from './voc-negatif.component';

describe('VocNegatifComponent', () => {
  let component: VocNegatifComponent;
  let fixture: ComponentFixture<VocNegatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocNegatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocNegatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
