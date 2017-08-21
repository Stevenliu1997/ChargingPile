import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {ProviderEditComponent} from './provider-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProviderRecordComponent} from './provider-record.component';

@Component({
    selector: 'app-tables',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
    animations: [routerTransition()]
})
export class ProviderComponent implements OnInit {


    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    /*查询对象*/
    queryModel: any = {};

    // datagrid 配置
    config: object = {
        key: 'factoryid',
        url: 'Factory/Find',
        column: [
            {name: '厂商ID', key: 'factoryid'},
            {name: '厂商名称', key: 'name'},
            {name: '厂商所在省', key: 'province'},
            {name: '厂商所在市', key: 'city'},
            {name: '厂商详细地址', key: 'position'},

            {name: '联系人姓名', key: 'contactor'},
            {name: '联系人电话', key: 'phone'}
        ],
        params: function () {
            let queryModel = Object.assign({}, this.queryModel);
            if (!queryModel.factoryid) {
                queryModel.factoryid = -1;
            }
            return queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ProviderEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';

                    modalRef.result.then(result => {
                        let tempResult = Object.assign({}, result);
                        tempResult.factoryid = -1;
                        this.addProvider(tempResult);
                        this.refreshGrid();
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
                    url: 'Factory/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'Factory/Delete'
                }
            },
            {
                type: 'edit',
                name: '编辑',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ProviderEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                            let tempResult = Object.assign({}, result);
                            this.updateProvider(tempResult);
                    },
                    error => {
                    })
                }.bind(this)
            },
            {
                type: 'detail',
                name: '详情',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ProviderRecordComponent, {size: "lg"});
                    modalRef.componentInstance.factoryid = item.factoryid;
                }.bind(this)
            }
        ]
    };

    constructor(private ngbModal: NgbModal) {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    initquery() {
        this.queryModel = {};

    }

}
