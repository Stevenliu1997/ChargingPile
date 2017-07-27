import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeProgramComponent } from './recharge-program.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {RechargeProgramRoutingModule} from './recharge-program-routing.module';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {RechargeProgramAddComponent} from "./recharge-program-add.component";
import {RechargeProgramEditComponent} from "./recharge-program-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RechargeProgramRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        RechargeProgramComponent,
        RechargeProgramAddComponent,
        RechargeProgramEditComponent
    ],
    entryComponents: [
        RechargeProgramEditComponent,
        RechargeProgramAddComponent
    ]
})
export class RechargeProgramModule {
}
