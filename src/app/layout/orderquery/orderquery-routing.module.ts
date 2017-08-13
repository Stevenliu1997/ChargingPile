import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderQueryComponent } from './orderquery.component';
import {OrderQueryDetailComponent} from "./orderquery-detail/orderquery-detail.component";

const routes: Routes = [
    { path: '', component: OrderQueryComponent },
    { path: 'detail/:id', component: OrderQueryDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderQueryRoutingModule { }
