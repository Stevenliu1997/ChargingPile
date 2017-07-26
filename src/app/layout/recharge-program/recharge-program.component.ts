import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {DatagridComponent} from "../../shared/components/widget/datagrid/datagrid.component";

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
        url: 'recharge-program/Find',
        column: [
            {name: '程序版本号', key: 'version'},
            {name: '程序名称', key: 'name'},
            {name: '程序所在路径', key: 'path'}
        ],
        // 与后端交互，queryModel.name
        params: (function (thisObj) {
            return function () {
                return thisObj.queryModel;
            }
        })(this),
        rowActions: [
            {
                type: `upload`,
                action: function(item) {
                    console.log(item);
                }
            },
            {
                type: 'delete',
                action: function (item) {
                    console.log(item);
                }
            },
            {
                type: 'edit',
                action: function (item) {
                    console.log(item);
                }
            }
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
}
