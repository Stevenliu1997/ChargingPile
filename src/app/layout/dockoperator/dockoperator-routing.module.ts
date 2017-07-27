import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockoperatorComponent } from './dockoperator.component';

const routes: Routes = [
    { path: '', component: DockoperatorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DockoperatorRoutingModule { }
