import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {ToolModule} from "../../services/tool.module";
import {ValidationMsgDirective} from "../validation-msg/validation-msg.directive";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolModule
    ],
    declarations: [
        DatagridComponent,
        ValidationMsgDirective
    ],
    exports: [
        DatagridComponent,
        ValidationMsgDirective
    ]
})
export class WidgetModule {


}
