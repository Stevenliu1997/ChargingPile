/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './user-record.component.html'
})
export class UserRecordComponent {

    @Input()
    account: string;

    operationLogConfig: object = {
        url: 'Record/Site',
        column: [
            {name: '记录ID', key: 'useraccount'},
            {name: '操作品牌', key: 'operatesite'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'operater'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {account: this.account};
        }.bind(this)
    };

    loginLogConfig: object = {
        url: 'Record/LoginOut',
        column: [
            {name: '用户账户', key: 'account'},
            {name: '记录ID', key: 'recordid'},
            {name: '操作类型', key: 'rtype'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {account: this.account};
        }.bind(this)
    };
    rechargeLogConfig: object = {
        url: 'ManageUser/Find',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作充电桩', key: 'operatepile'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'useraccount'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {account: this.account};
        }.bind(this)
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
