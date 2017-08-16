import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { BaiduMapModule } from 'angular2-baidu-map';//import BaiduMapModule
import { RealTimeMonitoringRoutingModule } from './real-time-monitoring-routing.module'
import { RealTimeMonitoringComponent } from './real-time-monitoring.component';

@NgModule({
    imports: [
        CommonModule,
        BaiduMapModule,
        RealTimeMonitoringRoutingModule,
        PageHeaderModule
    ],
    declarations: [ RealTimeMonitoringComponent ],
    bootstrap:    [ RealTimeMonitoringComponent ]
})
export class RealTimeMonitoringModule {}
