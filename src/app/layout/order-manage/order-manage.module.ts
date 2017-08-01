import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManageComponent } from './order-manage.component';
import { OrderManageRoutingModule } from './order-manage-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {OrderManageEditComponent} from "./order-manage-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderManageRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [OrderManageComponent, OrderManageEditComponent],
    entryComponents: [OrderManageEditComponent]
})
export class OrderManageModule { }
