import {NgModule, NO_ERRORS_SCHEMA, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './provider.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {ProviderEditComponent} from "./provider-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProviderRecordComponent} from "./provider-record.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProviderRoutingModule,
        PageHeaderModule,
        WidgetModule,
        NgbModule
    ],
    declarations: [ProviderComponent, ProviderEditComponent,ProviderRecordComponent],
    entryComponents: [ProviderEditComponent,ProviderRecordComponent]
})
export class ProviderModule { }
