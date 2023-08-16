import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingByCkComponent } from './receiving-by-ck.component';

describe('ReceivingByCkComponent', () => {
  let component: ReceivingByCkComponent;
  let fixture: ComponentFixture<ReceivingByCkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingByCkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingByCkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
