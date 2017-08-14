import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICCardCheckComponent } from './IC-card-check.component';
import { ICCardCheckRoutingModule } from './IC-card-check-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {ICCardCheckEditComponent} from "./IC-card-check-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OperationRecordComponent} from "./operation-record.component";
import {ICCardInfoComponent} from "./IC-card-info.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ICCardCheckRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [
        ICCardCheckComponent,
        ICCardCheckEditComponent,
        OperationRecordComponent,
        ICCardInfoComponent
    ],
    entryComponents: [
        ICCardCheckEditComponent,
        OperationRecordComponent,
        ICCardInfoComponent
    ]
})
export class ICCardCheckModule{ }
