import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletGoodsComponent } from './outlet-goods.component';

describe('OutletGoodsComponent', () => {
  let component: OutletGoodsComponent;
  let fixture: ComponentFixture<OutletGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
