import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PileMonitorComponent } from './pile-monitor.component';
import { PileMonitorRoutingModule } from './pile-monitor-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';

import {FactoryInformationComponent} from './ModalPage/factory-information.component';
import {AlertInformationComponent} from './ModalPage/alert-information.component';
import {TransactionRecordComponent} from './ModalPage/transaction-record.component';
import {StatusInformationComponent} from './ModalPage/status-information.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PileMonitorRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        PileMonitorComponent,
        FactoryInformationComponent,
        AlertInformationComponent,
        TransactionRecordComponent,
        StatusInformationComponent
    ],
    entryComponents: [
        FactoryInformationComponent,
        AlertInformationComponent,
        TransactionRecordComponent,
        StatusInformationComponent
    ],
})
export class PileMonitorModule { }
