import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAnalysisComponent } from './order-analysis.component';

const routes: Routes = [
    { path: '', component: OrderAnalysisComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderAnalysisRoutingModule { }
