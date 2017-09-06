import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BigScreenComponent} from "./big-screen.component";
import {BigScreenRoutingModule} from "./big-screen-routing.module";
import {ToolModule} from "../shared/services/tool.module";
import {AngularEchartsModule} from "ngx-echarts";

@NgModule({
    imports: [
        CommonModule,
        BigScreenRoutingModule,
        ToolModule,
        AngularEchartsModule
    ],
    declarations: [BigScreenComponent]
})
export class BigScreenModule {
}
