import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteManagementComponent } from './site-management.component';
import { SiteManagementRoutingModule } from './site-management-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';
import {SiteDeleteComponent} from './ModalPage/site-delete.component';
import {SiteCreateComponent} from './ModalPage/site-create.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteManagementRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        SiteManagementComponent,
        SiteDataComponent,
        SiteInformationComponent,
        SiteModifyInformationComponent,
        SiteDeleteComponent,
        SiteCreateComponent,
    ],
    entryComponents: [
        SiteDataComponent,
        SiteInformationComponent,
        SiteModifyInformationComponent,
        SiteDeleteComponent,
        SiteCreateComponent,
    ]
})
export class SiteManagementModule { }
