import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'recharge-program/Find' /*'Program/Find'*/,    //和后端交互URL
        column: [
            {name: '程序版本号', key: 'version'},
            {name: '程序名称', key: 'programname'}
        ],
        // 与后端交互，queryModel.name
        params: function () {
            return this.queryModel;
        }.bind(this),
    };
    constructor(public router: Router, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

}
