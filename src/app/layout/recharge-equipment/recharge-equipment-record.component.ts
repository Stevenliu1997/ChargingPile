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

    rechargeDetail: object = {
        url: 'Pile/Find',//TODO
        column: [
            {name: '电源类型', key: 'powertype'},
            {name: '电压', key: 'v'},
            {name: '电流', key: 'i'},
            {name: '功率', key: 'p'},
            {name: '接口类型', key: 'interfacetype'},
            {name: '接口标准', key: 'interfacestatard'},
            {name: '程序ID', key: 'programid'},
            {name: '厂商ID', key: 'factoryid'},
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
