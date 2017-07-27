import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FileUploadModule } from 'ng2-file-upload';

import { RechargeProgramComponent } from './recharge-program.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {RechargeProgramRoutingModule} from './recharge-program-routing.module';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {RechargeProgramAddComponent} from "./recharge-program-add.component";
import {RechargeProgramEditComponent} from "./recharge-program-edit.component";
import {HomeFileComponent} from "./upload-file.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RechargeProgramRoutingModule,
        PageHeaderModule,
        WidgetModule,
        // FileUploadModule
    ],
    declarations: [
        RechargeProgramComponent,
        RechargeProgramAddComponent,
        RechargeProgramEditComponent,
        // HomeFileComponent
    ],
    entryComponents: [
        RechargeProgramEditComponent,
        RechargeProgramAddComponent
    ]
})
export class RechargeProgramModule {
}
