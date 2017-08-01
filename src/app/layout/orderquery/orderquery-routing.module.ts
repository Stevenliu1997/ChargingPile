import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderQueryComponent } from './orderquery.component';

const routes: Routes = [
    { path: '', component: OrderQueryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderQueryRoutingModule { }
