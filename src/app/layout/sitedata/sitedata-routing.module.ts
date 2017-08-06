import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteDataComponent } from './sitedata.component';

const routes: Routes = [
    { path: '', component: SiteDataComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteDataRoutingModule { }
