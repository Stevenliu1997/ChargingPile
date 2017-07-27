import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DockoperatorComponent } from './dockoperator.component';
import { DockoperatorRoutingModule } from './dockoperator-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {DockoperatorEditComponent} from "./dockoperator-edit.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Operator} from "rxjs/Operator";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DockoperatorRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [DockoperatorComponent, DockoperatorEditComponent],
    entryComponents: [DockoperatorEditComponent]
})
export class DockoperatorModule { }
