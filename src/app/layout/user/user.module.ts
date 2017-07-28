import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from "@angular/forms";
import {WidgetModule} from "../../shared/components/widget/widget.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UserEditComponent} from "./user-edit.component";
import {User} from "../../shared/models/User";
import {UserRecordComponent} from "./user-record.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [UserComponent, UserEditComponent, UserRecordComponent],
    entryComponents: [UserEditComponent, UserRecordComponent]
})
export class UserModule {
}
