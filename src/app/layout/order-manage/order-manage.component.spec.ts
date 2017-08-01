import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageHeaderModule } from './../../shared';
import { OrderManageComponent } from './order-manage.component';

describe('OrderManageComponent', () => {
  let component: OrderManageComponent;
  let fixture: ComponentFixture<OrderManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      PageHeaderModule,
    ],
      declarations: [ OrderManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
