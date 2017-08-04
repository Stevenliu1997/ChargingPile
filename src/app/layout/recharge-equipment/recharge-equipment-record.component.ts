/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './recharge-equipment-record.component.html'
})
export class RechargeEquipmentRecordComponent {

    @Input()
    userId: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
