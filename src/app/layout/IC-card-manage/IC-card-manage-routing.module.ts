import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ICCardManageComponent } from './IC-card-manage.component';

const routes: Routes = [
    { path: '', component: ICCardManageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ICCardManageRoutingModule { }
