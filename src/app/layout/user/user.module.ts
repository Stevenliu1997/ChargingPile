import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from "@angular/forms";
import {WidgetModule} from "../../shared/components/widget/widget.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [UserComponent]
})
export class UserModule {
}
