import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {RoleEditComponent} from "./role-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-tables',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    animations: [routerTransition()]
})
export class RoleComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
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
                    const modalRef = this.ngbModal.open(RoleEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.updateRole(result);
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this)

            }
        ],
        rowActions: [
            {
                type: 'delete',
                action: function (item) {
                    console.log(item);
                }
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(RoleEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateRole(result);
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

    updateRole(role: object){
        this.customHttpClient.post('Role/Update', role).subscribe(result => {

        })
    }
}
