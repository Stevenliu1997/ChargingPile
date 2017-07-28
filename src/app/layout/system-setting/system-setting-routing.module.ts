import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemSettingComponent } from './system-setting.component';

const routes: Routes = [
    { path: '', component: SystemSettingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
