import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {ToolModule} from "../../services/tool.module";
import {ValidationMsgDirective} from "../validation-msg/validation-msg.directive";
import {ChartsModule} from "ng2-charts";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolModule,
        ChartsModule
    ],
    declarations: [
        DatagridComponent,
        ValidationMsgDirective
    ],
    exports: [
        DatagridComponent,
        ValidationMsgDirective,
        ChartsModule
    ]
})
export class WidgetModule {


}
