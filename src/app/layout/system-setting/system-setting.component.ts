import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'system-setting',
    templateUrl: './system-setting.component.html',
    styleUrls: ['./system-setting.component.scss'],
    animations: [routerTransition()]
})
export class SystemSettingComponent implements OnInit {
    queryModel: any = {};
    constructor(private customHttpClient: CustomHttpClient) {
    }
    ngOnInit() {
        this.customHttpClient.post('SystemSetting/Systemsetting').subscribe(result => {
            if (result.code === '00') {
                this.queryModel.Status = result.Status;
            }
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
