import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeProgramComponent } from './recharge-program.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from "@angular/forms";
import {RechargeProgramRoutingModule} from "./recharge-program-routing.module";
import {WidgetModule} from "../../shared/components/widget/widget.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RechargeProgramRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [RechargeProgramComponent]
})
export class RechargeProgramModule {
}
