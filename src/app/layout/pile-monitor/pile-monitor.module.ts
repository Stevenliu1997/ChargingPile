import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PileMonitorComponent } from './pile-monitor.component';
import { PileMonitorRoutingModule } from './pile-monitor-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PileMonitorRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [PileMonitorComponent],
    entryComponents: []
})
export class PileMonitorModule { }
