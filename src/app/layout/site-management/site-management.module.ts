import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteManagementComponent } from './site-management.component';
import { SiteManagementRoutingModule } from './site-management-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';

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
    ],
    entryComponents: [
        SiteDataComponent,
        SiteInformationComponent,
        SiteModifyInformationComponent,
    ]
})
export class SiteManagementModule { }
