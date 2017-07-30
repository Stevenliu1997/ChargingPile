/**
 * Created by mac on 2017/7/29.
 */
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './provider-record.component.html'
})
export class ProviderRecordComponent {

    @Input()
    factoryid: string;

    operationLogConfig: object = {
        url: 'Factory/Find',
        column: [
            {name: '厂商ID', key: 'factoryid'},
            {name: '厂商名称', key: 'name'},
            {name: '厂商详细地址', key: 'position'},
            {name: '厂商省市', key: 'provincecity'},
            {name: '联系人姓名', key: 'contactor'},
            {name: '联系人电话', key: 'phone'}
        ],
        params: function () {
            return {factoryid: this.factoryid};
        }.bind(this)
    };


    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
