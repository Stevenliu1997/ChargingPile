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
    queryModel: any = {
        state: ''
    };
    // datagrid 配置
    config: object = {
        key: ['pileid','gunid'],
        url: 'factoryset/find',    //和后端交互URL
        column: [
            {name: '枪ID', key: 'gunid'},
            {name: '桩ID', key: 'pileid'},
            {name: '地锁', key: '"haslock'},
            {name: '是否带枪', key: 'hasgun'},
            {name: '设备名称', key: 'pilename'},
            {name: 'MAC地址', key: 'mac'},
            {name: '固件版本', key: 'version'},
            {name: '状态', key: 'state'},
            {name: '二维码', key: 'qrcode'}
        ],
        // 与后端交互，queryModel.name
        params: function () {
            return this.queryModel;
        }.bind(this),

        rowActions: [
             {
                 type: 'edit',
                 action: function (item) {
                     const modalRef = this.ngbModal.open(FactorySettingsEditComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                         this.refreshGrid();
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
                    url:'factoryset/delete'
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
        this.queryModel.state='';
    }
    exportGrid(){
        let options = this.queryModel;
        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "factoryset/getexcel?"+params.toString();
        window.open(URL);
    }
}
