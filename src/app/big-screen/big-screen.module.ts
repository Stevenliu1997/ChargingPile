import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BigScreenComponent} from "./big-screen.component";
import {BigScreenRoutingModule} from "./big-screen-routing.module";
import {ToolModule} from "../shared/services/tool.module";
import {AngularEchartsModule} from "ngx-echarts";
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        BigScreenRoutingModule,
        ToolModule,
        AngularEchartsModule,
        ChartsModule
    ],
    declarations: [BigScreenComponent]
})
export class BigScreenModule {
}
