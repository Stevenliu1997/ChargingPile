import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FactorySettingsComponent } from './factory-settings.component';

const routes: Routes = [
    { path: '', component: FactorySettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorySettingsRoutingModule { }
