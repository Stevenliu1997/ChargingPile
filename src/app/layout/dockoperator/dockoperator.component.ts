import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {DockoperatorEditComponent} from "./dockoperator-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-tables',
    templateUrl: './dockoperator.component.html',
    styleUrls: ['./dockoperator.component.scss'],
    animations: [routerTransition()]
})
export class DockoperatorComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {

    };
    // datagrid 配置
    config: object = {
        key: 'operatorid',
        url: 'Operator/Find',
        column: [
            {name: '运营商ID', key: 'operatorid'},
            {name: '运营商名称', key: 'operatorname'},
            {name: '联系人', key: 'contactor'},
            {name: '手机号', key: 'phone'},
            {name: '锁定状态', key: 'state'},
            {name: '备注信息', key :'remark'}
        ],
        params: function () {
            let queryModel = Object.assign({},this.queryModel);
            if (!queryModel.operatorid){
                queryModel.operatorid = -1;
            }
            return queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(DockoperatorEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        result.operatorid = -1;
                        this.addOperator(result);
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
                    url:'Operator/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(DockoperatorEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateOperator(result);
                    },
                    error => {
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
        this.datagridComponent.refreshGrid();
    }

    updateOperator(operator: object){
        this.customHttpClient.post('Operator/Update', operator).subscribe(result => {
            if(result.code == '00'){
                this.refreshGrid();
            }else {
                this.refreshGrid();
                console.log(result.message);
            }
        })
    }

    addOperator(operator: object){
        this.customHttpClient.post('Operator/Add', operator).subscribe(result => {
            if(result.code == '00'){
                this.refreshGrid();
            }else {
                this.refreshGrid();
                console.log(result.message);
            }
        })
    }

    blankGrid(){
        this.queryModel = {};
    }
}
