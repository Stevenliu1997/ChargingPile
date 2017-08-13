import {Component, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {OrderQueryEditComponent} from "./orderquery-edit.component";
import {OrderQueryRecordComponent} from "./orderquery-record.component";

@Component({
    selector: 'app-form',
    templateUrl: 'orderquery.component.html',
    styleUrls: ['orderquery.component.scss'],
    animations: [routerTransition()]
})
export class OrderQueryComponent implements OnInit {
    name: string = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'OrderQuery/Find',
        column: [
            {name: '订单号', key: 'orderid'},
            {name: '订单状态', key: 'orderstate'},
            {name: '充电时长', key: 'chargetime'},
            {name: '总电量', key: 'power'},
            {name: '完成时间', key: 'endtime'},
            {name: '支付方式', key: 'pay'},
            {name: '用户', key: 'user'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        /*topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(OrderQueryEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.addUser(result);
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
                    url: 'ManageUser/delete'
                }
            }
        ],*/
        rowActions: [
            /*{
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(OrderQueryEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateOrder(result);
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                },
                autoConfig: {
                    url:'OrderQuery/Find'
                }
            }*/
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(OrderQueryRecordComponent, {size: "lg"});
                    modalRef.componentInstance.account = item.account;
                    modalRef.result.then(result => {
                        this.getdetail(result);
                    },error => {})
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

    blankGrid(){
        this.queryModel = {};

    }

    getdetail(){
        this.customHttpClient.post("",)
    }
    exportGrid(){

    }
}
