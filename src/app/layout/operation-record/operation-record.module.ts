import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRecordRoutingModule } from './operation-record-routing.module';
import { OperationRecordComponent } from './operation-record.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from "@angular/forms";
import {WidgetModule} from "../../shared/components/widget/widget.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
//import {OperationRecordEditComponent} from "./user-edit.component";
//import {User} from "../../shared/models/User";
//import {OperationRecordRecordComponent} from "./operation-record-record.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OperationRecordRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [OperationRecordComponent],
    entryComponents: [OperationRecordComponent]
})
export class OperationRecordModule {
}
