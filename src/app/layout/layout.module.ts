import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import {WidgetModule} from "../shared/components/widget/widget.module";
import {LoginService} from "../login/login.service";
import {FormsModule} from "@angular/forms";
import {BusinessToolModule} from "../shared/business-selector/business-tool.module";

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        WidgetModule,
        BusinessToolModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    providers: [LoginService]
})
export class LayoutModule { }
