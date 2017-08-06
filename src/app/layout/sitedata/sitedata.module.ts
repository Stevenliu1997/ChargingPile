import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteDataComponent } from './sitedata.component';
import { SiteDataRoutingModule } from './sitedata-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {SiteDataEditComponent} from "./sitedata-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteDataRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [SiteDataComponent, SiteDataEditComponent],
    entryComponents: [SiteDataEditComponent]
})
export class SiteDataModule { }
