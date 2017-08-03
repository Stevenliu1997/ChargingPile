import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ICCardCheckComponent } from './IC-card-check.component';

const routes: Routes = [
    { path: '', component: ICCardCheckComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ICCardCheckRoutingModule { }
