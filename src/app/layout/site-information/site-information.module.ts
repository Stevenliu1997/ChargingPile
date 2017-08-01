import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteInformationComponent } from './site-information.component';
import { SiteInformationRoutingModule } from './site-information-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SiteInformationRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [SiteInformationComponent],
    entryComponents: [SiteInformationComponent]
})
export class SiteInformationModule { }
