import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageHeaderModule } from './../../shared';
import { OrderAnalysisComponent } from './order-analysis.component';

describe('OrderAnalysisComponent', () => {
    let component: OrderAnalysisComponent;
    let fixture: ComponentFixture<OrderAnalysisComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                PageHeaderModule,
            ],
            declarations: [ OrderAnalysisComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderAnalysisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
