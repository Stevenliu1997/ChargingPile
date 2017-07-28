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
    userId: string;

    operationLogConfig: object = {
        url: 'User/test',
        column: [
            {name: '用户ID', key: 'userid'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: 'Email', key: 'email'},
            {name: '手机号', key: 'phonenumber'},
            {name: 'QQ', key: 'qq'},
            {name: '微信', key: 'wechat'},
            {name: '锁定状态', key: 'status'},
            {name: '运营商ID', key: 'serverid'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };

    loginLogConfig: object = {
        url: 'User/test',
        column: [
            {name: '用户ID', key: 'userid'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: 'Email', key: 'email'},
            {name: '手机号', key: 'phonenumber'},
            {name: 'QQ', key: 'qq'},
            {name: '微信', key: 'wechat'},
            {name: '锁定状态', key: 'status'},
            {name: '运营商ID', key: 'serverid'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };
    rechargeLogConfig: object = {
        url: 'User/test',
        column: [
            {name: '用户ID', key: 'userid'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: 'Email', key: 'email'},
            {name: '手机号', key: 'phonenumber'},
            {name: 'QQ', key: 'qq'},
            {name: '微信', key: 'wechat'},
            {name: '锁定状态', key: 'status'},
            {name: '运营商ID', key: 'serverid'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
