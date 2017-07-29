import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationRecordComponent } from './operation-record.component';

const routes: Routes = [
    { path: '', component: OperationRecordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRecordRoutingModule { }
