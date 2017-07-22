import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
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
