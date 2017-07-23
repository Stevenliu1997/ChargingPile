import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        DatagridComponent
    ],
    exports: [
        DatagridComponent,
        HttpClientModule
    ]
})
export class WidgetModule {


}
