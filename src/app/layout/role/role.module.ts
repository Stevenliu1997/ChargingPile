import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {RoleEditComponent} from "./role-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RoleRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [RoleComponent, RoleEditComponent],
    entryComponents: [RoleEditComponent]
})
export class RoleModule { }
