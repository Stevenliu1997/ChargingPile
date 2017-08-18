import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {FactorySettingsEditComponent} from './factory-settings-edit.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'factory-settings',
    templateUrl: './factory-settings.component.html',
    styleUrls: ['./factory-settings.component.scss'],
    animations: [routerTransition()]
})
export class FactorySettingsComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        key: '',
        url: '',    //和后端交互URL
        column: [
            {name: '程序ID', key: 'programid'},
            {name: '程序版本号', key: 'version'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'},
            {name: '程序名称', key: 'programname'}
        ],
        // 与后端交互，queryModel.name
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(FactorySettingsEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    },error =>{})
                }.bind(this)
            }
        ],
        rowActions: [
             {
                 type: 'edit',
                 action: function (item) {
                     const modalRef = this.ngbModal.open(FactorySettingsEditComponent);
                    modalRef.componentInstance.actionTitle = '更新';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                         this.updateProgram(result);
                     },error => {})
                 }.bind(this)
             },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                    console.log(item);
                }.bind(this),
                autoConfig: {
                    url:'Program/Delete'
                }
            }
        ]
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }


    ngOnInit() {
    }
    //查
    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
    //改

    clear(){
        this.queryModel={};
    }
}
