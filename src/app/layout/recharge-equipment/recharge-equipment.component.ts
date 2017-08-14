import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {RechargeEquipmentEditComponent} from "./recharge-equipment-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {RechargeEquipmentRecordComponent} from "./recharge-equipment-record.component";

@Component({
    selector: 'app-tables',
    templateUrl: './recharge-equipment.component.html',
    styleUrls: ['./recharge-equipment.component.scss'],
    animations: [routerTransition()]
})
export class RechargeEquipmentComponent implements OnInit {

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {
        state: '',
        pileid: '',
        name: '',
        siteid: '',
        factoryid: ''
    };
    // datagrid 配置
    config: object = {
        key: 'pileid',
        url: 'Pile/Find',
        column: [
            {name: '设备ID', key: 'pileid'},
            {name: '设备名称', key: 'pilename'},
            {name: '设备型号', key: 'type'},
            {name: '厂商ID', key: 'factoryid'},
            {name: '站点ID', key: 'siteid'},
            {name: '是否故障', key: 'state'},
            {name: '工作状态', key: 'workstation'},
            {name: '位置信息', key: 'position'},
            {name: '设备备注', key: 'remarks'}
        ],
        params: function () {
            let queryModel=Object.assign({},this.queryModel);
            if(queryModel.factoryid == '')
                queryModel.factoryid = -1;
            if(queryModel.siteid == '')
                queryModel.siteid = -1;
            return queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {

                    const modalRef = this.ngbModal.open(RechargeEquipmentEditComponent);
                    modalRef.componentInstance.actionTitle = '新增';
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    },error => {
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url:'Pile/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                name: '详细信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(RechargeEquipmentRecordComponent);
                    modalRef.componentInstance.editModel = Object.assign({},item);
                }.bind(this)
            },
            {
                type: 'edit',
                name: '修改',
                action: function (item) {
                    const modalRef = this.ngbModal.open(RechargeEquipmentEditComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    },error => {
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                },
                autoConfig: {
                    url:'Pile/Delete'
                }
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


    clear(){
        this.queryModel={
            state: '',
            pileid: '',
            name: '',
            siteid: '',
            factoryid: ''
        }
    }
}
