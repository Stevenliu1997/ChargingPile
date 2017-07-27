import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeEquipmentComponent } from './recharge-equipment.component';

const routes: Routes = [
    { path: '', component: RechargeEquipmentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RechargeEquipmentRoutingModule { }
