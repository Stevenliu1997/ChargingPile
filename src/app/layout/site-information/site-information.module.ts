import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteInformationComponent } from './site-information.component';
import { SiteInformationRoutingModule } from './site-information-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SiteManagementAddComponent} from './site-management-modal/site-management-add.component';
import {ChargingRuleAddComponent} from './charging-rule-modal/charging-rule-add.component';
import {ArticleManagementAddComponent} from './article-management-modal/article-management-add.component';
import {SiteEssentialInformationComponent} from './site-management-modal/site-essential-information.component';
import {SiteModifyInformationComponent} from './site-management-modal/site-modify-information.component';
import {EditDeviceComponent} from './site-management-modal/edit-device.component';
import {ChargingPileInformationComponent} from './site-management-modal/charging-pile-information.component';
import {ChargingRuleEditComponent} from './charging-rule-modal/charging-rule-edit.component';
import {ChargingRuleInformationComponent} from './charging-rule-modal/charging-rule-information.component';
import {AddRuleComponent} from './charging-rule-modal/add-rule.component';
import {GunInformationComponent} from './site-management-modal/gun-information.component';
import {ChargingRuleUpdateComponent} from './charging-rule-modal/charging-rule-update.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteInformationRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule,
    ],
    declarations: [
        SiteInformationComponent,
        SiteManagementAddComponent,
        ChargingRuleAddComponent,
        ArticleManagementAddComponent,
        SiteEssentialInformationComponent,
        SiteModifyInformationComponent,
        EditDeviceComponent,
        ChargingPileInformationComponent,
        ChargingRuleEditComponent,
        ChargingRuleInformationComponent,
        AddRuleComponent,
        GunInformationComponent,
        ChargingRuleUpdateComponent,
    ],
    entryComponents: [
        SiteInformationComponent,
        SiteManagementAddComponent,
        ChargingRuleAddComponent,
        ArticleManagementAddComponent,
        SiteEssentialInformationComponent,
        SiteModifyInformationComponent,
        EditDeviceComponent,
        ChargingPileInformationComponent,
        ChargingRuleEditComponent,
        ChargingRuleInformationComponent,
        AddRuleComponent,
        GunInformationComponent,
        ChargingRuleUpdateComponent,
    ]
})
export class SiteInformationModule { }
