import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderQueryComponent } from './orderquery.component';
import { OrderQueryRoutingModule } from './orderquery-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderQueryEditComponent} from "./orderquery-edit.component";
import {OrderQueryRecordComponent} from "./orderquery-record.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderQueryRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule,
    ],
    declarations: [OrderQueryComponent,OrderQueryEditComponent,OrderQueryRecordComponent],
    entryComponents: [OrderQueryEditComponent,OrderQueryRecordComponent]
})
export class OrderQueryModule { }
