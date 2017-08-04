import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {ToolModule} from "../../services/tool.module";
import {ValidationMsgDirective} from "../validation-msg/validation-msg.directive";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {ToastConfig} from "../toast/toast.config";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolModule,
        ToastModule.forRoot()
    ],
    declarations: [
        DatagridComponent,
        ValidationMsgDirective
    ],
    exports: [
        DatagridComponent,
        ValidationMsgDirective
    ],
    providers: [
        {provide: ToastOptions, useClass: ToastConfig},
    ]
})
export class WidgetModule {


}
