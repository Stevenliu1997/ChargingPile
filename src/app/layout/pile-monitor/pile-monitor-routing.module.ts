import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PileMonitorComponent } from './pile-monitor.component';

const routes: Routes = [
    { path: '', component: PileMonitorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PileMonitorRoutingModule { }
