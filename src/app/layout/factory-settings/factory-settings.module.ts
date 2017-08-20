import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorySettingsComponent } from './factory-settings.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {FactorySettingsRoutingModule} from './factory-settings-routing.module';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {FactorySettingsEditComponent} from "./factory-settings-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FactorySettingsRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        FactorySettingsComponent,
        FactorySettingsEditComponent
    ],
    entryComponents: [
        FactorySettingsEditComponent
    ]
})
export class FactorySettingsModule {
}
