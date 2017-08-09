import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-site-modify-information',
    templateUrl: './site-modify-information.component.html'
})
export class SiteModifyInformationComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient
    ) {}

    confirm() {
        if (this.editForm.form.invalid) {
            return;
        }
        if (this.actionTitle === '新建站点') {
            this.add(this.editModel);
        } else if (this.actionTitle === '修改信息') {
            this.update(this.editModel);
        }
    }
    add(obj: any) {
        const tempResult = Object.assign({}, obj);
        tempResult.siteid = -1;
        tempResult.provincecity = `${tempResult.province || ''}${tempResult.city || ''}`;
        tempResult.province = undefined;
        tempResult.city = undefined;
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() - 1) + '-' + date.getDate() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        tempResult.createtime = time;
        this.customHttpClient.post('Site/Add', tempResult).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
    update(obj: any) {
        const tempResult = Object.assign({}, obj);
        tempResult.siteid = -1;
        tempResult.provincecity = `${tempResult.province || ''}${tempResult.city || ''}`;
        tempResult.province = undefined;
        tempResult.city = undefined;
        this.customHttpClient.post('Site/Update', tempResult).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}




