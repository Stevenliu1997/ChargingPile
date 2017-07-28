import {NgModule, NO_ERRORS_SCHEMA, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderComponent } from './provider.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {ProviderEditComponent} from "./provider-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProviderRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [ProviderComponent, ProviderEditComponent],
    entryComponents: [ProviderEditComponent]
})
export class ProviderModule { }
