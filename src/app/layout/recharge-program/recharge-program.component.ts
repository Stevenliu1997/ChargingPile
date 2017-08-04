import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {RechargeProgramAddComponent} from './recharge-program-add.component';
import {RechargeProgramEditComponent} from './recharge-program-edit.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-form',
    templateUrl: './recharge-program.component.html',
    styleUrls: ['./recharge-program.component.scss'],
    animations: [routerTransition()]
})
export class RechargeProgramComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    //查询对象
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        key: 'programid',
        url: 'Program/Find',    //和后端交互URL
        column: [
            {name: '程序ID', key: 'programid'},
            {name: '程序版本号', key: 'version'},
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
                action: function (ids) {
                    const modalRef = this.ngbModal.open(RechargeProgramAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        result.programid=-1;
                        this.addProgram(result);
                    },error =>{})
                }.bind(this)
            }
        ],
        rowActions: [
            {//TODO
                type: `upload`,
                action: function (item) {
                    const modalRef = this.ngbModal.open(RechargeProgramEditComponent);
                    modalRef.componentInstance.actionTitle = '上传';
                    modalRef.componentInstance.editModel = Object.assign({},item);
                    modalRef.result.then(result => {
                        this.updateProgram(result);
                    },error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(RechargeProgramEditComponent);
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
    updateProgram(program: object){
        this.customHttpClient.post('Program/Add', program).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        },error => {
        })
    }
    addProgram(program: object){
        this.customHttpClient.post('Program/Add', program).subscribe(result => {
            if(result.code == '00')
                this.refreshGrid();
        },error => {
        })
    }
    clear(){
        this.queryModel={};
    }
}
