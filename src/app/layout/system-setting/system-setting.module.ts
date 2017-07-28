import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingComponent } from './system-setting.component';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SystemSettingRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [SystemSettingComponent],
    entryComponents: []
})
export class SystemSettingModule { }
