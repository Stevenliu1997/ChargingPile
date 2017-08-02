import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteInformationComponent } from './site-information.component';

const routes: Routes = [
    { path: '', component: SiteInformationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteInformationRoutingModule { }
