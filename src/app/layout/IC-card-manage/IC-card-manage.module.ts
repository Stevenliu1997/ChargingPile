import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICCardManageComponent } from './IC-card-manage.component';
import { ICCardManageRoutingModule } from './IC-card-manage-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {ICCardManageEditComponent} from "./IC-card-manage-edit.component";
import {OwnerChooseComponent} from "./owner-choose.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ICCardManageRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [
        ICCardManageComponent,
        ICCardManageEditComponent,
        OwnerChooseComponent
    ],
    entryComponents: [
        ICCardManageEditComponent,
        OwnerChooseComponent
    ]
})
export class ICCardManageModule{ }
