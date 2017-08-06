import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {UserEditComponent} from "./user-edit.component";
import {UserRecordComponent} from "./user-record.component";

@Component({
    selector: 'app-form',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss'],
    animations: [routerTransition()]
})
export class UserComponent implements OnInit {
    name: string = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        key: 'account',
        url: 'ManageUser/Find',
        column: [
            {name: '用户ID', key: 'account'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: 'Email', key: 'email'},
            {name: '手机号', key: 'phone'},
            {name: 'QQ', key: 'qq'},
            {name: '微信', key: 'weixin'},
            {name: '锁定状态', key: 'lockstate'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(UserEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    },error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url: 'ManageUser/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(UserEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    },
                    error => {})
                }.bind(this)
            },
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(UserRecordComponent, {size: "lg"});
                    modalRef.componentInstance.account = item.account;
                }.bind(this)
            }
        ]
    };
    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    blankGrid(){
        this.queryModel = {};
    }
}
