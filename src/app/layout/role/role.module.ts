import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RoleRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [RoleComponent]
})
export class RoleModule { }
