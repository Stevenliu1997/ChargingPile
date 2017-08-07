import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderAnalysisComponent } from './order-analysis.component';
import { OrderAnalysisRoutingModule } from './order-analysis-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderAnalysisRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule,
        ChartsModule,
    ],
    declarations: [
        OrderAnalysisComponent,
    ],
    entryComponents: [
        OrderAnalysisComponent,
    ]
})
export class OrderAnalysisModule { }
