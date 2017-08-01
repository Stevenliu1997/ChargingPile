import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {OrderManageEditComponent} from "./order-manage-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-tables',
    templateUrl: './order-manage.component.html',
    styleUrls: ['./order-manage.component.scss'],
    animations: [routerTransition()]
})
export class OrderManageComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'Role/Find',
        column: [
            {name: '预订单ID', key: 'name'},
            {name: '创建时间', key: 'auth'},
            {name: '创建人', key: 'creator'},
            {name: '使用时间', key: 'usetime'},
            {name: '联系方式', key: 'phone'},
            {name: '站点', key: 'site'},
            {name: '充电桩', key: 'station'},
            {name: '充电枪', key: 'gun'},
            {name: '充电状态', key: 'state'},
            {name: '剩余时间', key: 'lefttime'},
            {name: '取消原因', key: 'reasion'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        /*topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(OrderManageEditComponent);
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
                    const modalRef = this.ngbModal.open(OrderManageEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateRole(result);
                    },
                    error => {
                    })
                }.bind(this)
            }
        ]*/
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

    blankinit(){
        this.queryModel.rechargename='';
        this.queryModel.ordernumber='';
        this.queryModel.stime='';
        this.queryModel.etime='';
    }
}
