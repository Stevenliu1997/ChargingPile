import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-site-management-add',
    templateUrl: './site-management-add.component.html'
})
export class SiteManagementAddComponent {

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
        this.add(this.editModel);
    }
    add(obj: any) {
        const tempResult = Object.assign({}, obj);
        tempResult.provincecity = `${tempResult.province || ''}${tempResult.city || ''}`;
        tempResult.province = undefined;
        tempResult.city = undefined;
        if (tempResult.isopen === 'true') {
            tempResult.isopen = true;
        } else if (tempResult.isopen === 'false') {
            tempResult.isopen = false;
        } else {
            tempResult.isopen = true;
        }
        if (tempResult.isscanning === 'true') {
            tempResult.isscanning = true;
        } else if (tempResult.isscanning === 'false') {
            tempResult.isscanning = false;
        } else {
            tempResult.isscanning = true;
        }
        this.customHttpClient.post('Site/Manage/Add', tempResult).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
