import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarBrandComponent } from './car-brand.component';
import { CarBrandRoutingModule } from './car-brand-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {CarBrandEditComponent} from './car-brand-edit.component';
import {CarBrandDetailComponent} from './car-brand-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CarBrandRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [CarBrandComponent, CarBrandEditComponent, CarBrandDetailComponent],
    entryComponents: [CarBrandEditComponent, CarBrandDetailComponent]
})
export class CarBrandModule { }
