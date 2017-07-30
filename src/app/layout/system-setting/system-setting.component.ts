import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'system-setting',
    templateUrl: './system-setting.component.html',
    styleUrls: ['./system-setting.component.scss'],
    animations: [routerTransition()]
})
export class SystemSettingComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    /*查询对象*/
    queryModel: any = {
        Status: ''
    };
    // datagrid 配置
    config: object = {
        url: 'SystemSetting/SystemSetting',
        column: [],
        params: (function (thisObj) {
            return function () {
                return thisObj.queryModel;
            }
        })(this),
        topActions: [],
        rowActions: []
    };
    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }
    ngOnInit() {
        this.customHttpClient.get('SystemSetting/Systemsetting').subscribe(result => {
            this.queryModel.Status = result.Status;
        }, error => {})
    }
    open(): void {
        this.queryModel.Status = '开启';
        this.customHttpClient.post('SystemSetting/Systemsetting', this.queryModel).subscribe(result => {
        }, error => {})
    }
    close(): void {
        this.queryModel.Status = '关闭';
        this.customHttpClient.post('SystemSetting/Systemsetting', this.queryModel).subscribe(result => {
        }, error => {})
    }
}
