import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {ProviderEditComponent} from "./provider-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ProviderRecordComponent} from './provider-record.component';

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

    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'Factory/Find',
        column: [
            {name: '厂商ID', key: 'factoryid'},
            {name: '厂商名称', key: 'name'},
            {name: '厂商详细地址', key: 'position'},
            {name: '厂商省市', key: 'provincecity'},
            {name: '联系人姓名', key: 'contactor'},
            {name: '联系人电话', key: 'phone'}
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
                        this.addProvider(result);
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
                    url:'Factory/delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'delete',
                action: function (item) {
                },
                autoConfig: {
                    url:'Factory/Find'
                }
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ProviderEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateProvider(result);
                    },
                    error => {
                    })
                }.bind(this)
            },
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ProviderRecordComponent, {size: "lg"});
                    modalRef.componentInstance.factoryid = item.factoryid;
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

    initquery(){
        this.queryModel.factoryid = '';
        this.queryModel.name= '';
        this.queryModel.position = '';
        this.queryModel.province = '';
        this.queryModel.city='';
        this.queryModel.phone = '';
        this.queryModel.contactor = '';

    }

    updateProvider(provider: object){
        this.customHttpClient.post('Factory/Update', provider).subscribe(result => {

        })
    }

    addProvider(provider: object){
        this.customHttpClient.post('Factory/Add', provider).subscribe(result => {

        })
    }
}
