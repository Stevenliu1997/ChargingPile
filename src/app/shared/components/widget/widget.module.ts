import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {ToolModule} from "../../services/tool.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolModule,
    ],
    declarations: [
        DatagridComponent
    ],
    exports: [
        DatagridComponent
    ]
})
export class WidgetModule {


}
