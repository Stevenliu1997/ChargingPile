import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RoleRoutingModule,
        PageHeaderModule
    ],
    declarations: [RoleComponent]
})
export class RoleModule { }
