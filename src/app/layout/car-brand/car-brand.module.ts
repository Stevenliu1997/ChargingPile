import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarBrandComponent } from './car-brand.component';
import { CarBrandRoutingModule } from './car-brand-routing.module';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {WidgetModule} from '../../shared/components/widget/widget.module';
import {CarBrandEditComponent} from './car-brand-edit.component';
import {CarBrandDetailComponent} from './car-brand-detail.component';
import {CarBrandIntroComponent} from "./car-brand-detail-modal/car-brand-intro.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CarBrandRoutingModule,
        PageHeaderModule,
        WidgetModule
    ],
    declarations: [
        CarBrandComponent,
        CarBrandEditComponent,
        CarBrandDetailComponent,
        CarBrandIntroComponent
    ],
    entryComponents: [CarBrandEditComponent, CarBrandDetailComponent,CarBrandIntroComponent]
})
export class CarBrandModule { }
