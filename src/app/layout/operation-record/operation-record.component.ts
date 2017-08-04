/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input,OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {NgbModal, NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-record',
    templateUrl: './operation-record.component.html',
    styleUrls: ['./operation-record.component.scss'],
    animations: [routerTransition()]
})
export class OperationRecordComponent {
    @ViewChild('siteLog')
    private siteLogComponent: DatagridComponent;

    @ViewChild('loginOutLog')
    private loginOutLogComponent: DatagridComponent;

    @ViewChild('rechargeLog')
    private rechargeLogComponent: DatagridComponent;


    queryModel: any = {};

    siteLogConfig: object = {
        key: 'recordid',
        url: 'Record/Site',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作站点', key: 'operatersite'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'operater'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this)
    };

    loginOutLogConfig: object = {
        key: 'recordid',
        url: 'Record/LoginOut',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'account'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this)
    };
    rechargeLogConfig: object = {
        key: 'recordid',
        url: 'Record/Pile',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作充电桩', key: 'operatepile'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'useraccount'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this)
    };
    constructor(private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshsiteLog(){
        this.siteLogComponent.refreshGrid();
    }
    refreshloginOutLog(){
        this.loginOutLogComponent.refreshGrid();
    }
    refreshrechargeLog(){
        this.rechargeLogComponent.refreshGrid();
    }

    change($event: NgbTabChangeEvent){
        if($event.activeId==='siteLog'){
            this.queryModel={};
        }else if($event.activeId==='rechargeLog'){
            this.queryModel={};
        }else if($event.activeId==='loginOutLog'){
            this.queryModel={};
        }

    }

}
