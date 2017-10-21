import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { BaiduMapModule } from 'angular2-baidu-map';//import BaiduMapModule
import { NgxAmapModule } from 'ngx-amap';

import { RealTimeMonitoringRoutingModule } from './real-time-monitoring-routing.module'
import { RealTimeMonitoringComponent } from './real-time-monitoring.component';

@NgModule({
    imports: [
        CommonModule,
        BaiduMapModule,
        RealTimeMonitoringRoutingModule,
        PageHeaderModule,
        NgbModule,
        ChartsModule,
        NgxAmapModule.forRoot({
            apiKey: '你申请的key'
        })
    ],
    declarations: [ RealTimeMonitoringComponent ],
    bootstrap:    [ RealTimeMonitoringComponent ]
})
export class RealTimeMonitoringModule {}
