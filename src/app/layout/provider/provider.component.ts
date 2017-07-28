import {Component, OnInit, Provider, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {ProviderEditComponent} from "./provider-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-tables',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
    animations: [routerTransition()]
})
export class ProviderComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    province: Array<string> = ['四川省','','','','',''];

    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'Role/Find',
        column: [
            {name: '角色名称', key: 'name'},
            {name: '角色权限', key: 'auth'},
            {name: '角色描述', key: 'desc'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ProviderEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.updateRole(result);
                    },
                    error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url:'Role/delete'
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
                    const modalRef = this.ngbModal.open(ProviderEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateRole(result);
                    },
                    error => {
                    })
                }.bind(this)
            },
            {
                type: 'detail',

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
    initquery(){
        this.queryModel.contact = '';
        this.queryModel.id = '';
        this.queryModel.address = '';
        this.queryModel.name = '';
        this.queryModel.phonenumber = '';

    }
    updateRole(role: object){
        this.customHttpClient.post('Role/Update', role).subscribe(result => {

        })
    }
}
