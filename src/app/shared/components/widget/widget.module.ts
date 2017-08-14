import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatagridComponent} from './datagrid/datagrid.component';
import {ToolModule} from "../../services/tool.module";
import {ValidationMsgDirective} from "../validation-msg/validation-msg.directive";
import {ChartsModule} from "ng2-charts";
import {Uploader} from "./uploader/uploader.service";
import {UploaderModalComponent} from "./uploader/uploader-modal.component";
import {FileUploadModule} from "ng2-file-upload";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolModule,
        ChartsModule,
        FileUploadModule
    ],
    declarations: [
        DatagridComponent,
        ValidationMsgDirective,
        UploaderModalComponent
    ],
    entryComponents: [UploaderModalComponent],
    exports: [
        DatagridComponent,
        ValidationMsgDirective,
        ChartsModule,
        FileUploadModule
    ],
    providers: [Uploader]
})
export class WidgetModule {


}
