/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input,OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-record',
    templateUrl: './operation-record.component.html',
    styleUrls: ['./operation-record.component.scss'],
    animations: [routerTransition()]
})
export class OperationRecordComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    queryModel: any = {};

    @Input()
    userId: string;

    siteLogConfig: object = {
        url: /*'Record/Site',*/ 'Record/test',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作品牌', key: 'operatersite'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'operater'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };

    loginOutLogConfig: object = {
        url: /*'Record/LoginOut',*/ 'Record/test',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'account'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };
    rechargeLogConfig: object = {
        url: /*'Record/Pile',*/ 'Record/test',
        column: [
            {name: '记录ID', key: 'recordid'},
            {name: '操作充电桩', key: 'operatepile'},
            {name: '操作类型', key: 'type'},
            {name: '操作用户', key: 'useraccount'},
            {name: '时间', key: 'operatetime'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this)
    };
    constructor(private customHttpClient: CustomHttpClient) {
    }

    confirm() {

    }
    ngOnInit() {
    }

    refreshGrid(){
        this.datagridComponent.refreshGrid();
    }

}
