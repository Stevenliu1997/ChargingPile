import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargeProgramComponent } from './recharge-program.component';

const routes: Routes = [
    { path: '', component: RechargeProgramComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechargeProgramRoutingModule { }
