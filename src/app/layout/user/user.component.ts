import {Component, OnInit, ViewChild} from '@angular/core';
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
    queryModel: any = {status: ''};
    // datagrid 配置
    config: object = {
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
                        this.updateUser(result);
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
                    url: 'Role/delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'delete',
                action: function (item) {
                },
                autoConfig: {
                    url:'Role/Find'
                }
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(UserEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateUser(result);
                    })
                }.bind(this)
            },
            {
                type :'record-query',
                action: function(item){
                    const modalRef = this.ngbModal.open(UserRecordComponent);
                    modalRef.componentInstance.actionTitle = '用户操作记录查询';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateUser(result);
                    })
                }.bind(this)
            }
        ]
    };
    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        console.log(this.config);
        this.datagridComponent.refreshGrid();
    }

    updateUser(user: object){
        this.customHttpClient.post('User/test', user).subscribe(result => {

        })
    }
}
