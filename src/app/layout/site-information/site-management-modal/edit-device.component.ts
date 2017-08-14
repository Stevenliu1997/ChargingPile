import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-site-management-device-edit',
    templateUrl: './edit-device.component.html'
})
export class EditDeviceComponent {

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
        if (this.actionTitle === '添加') {
            this.add(this.editModel);
        } else if (this.actionTitle === '修改') {
            this.update(this.editModel);
        }
    }
    add(obj: object) {
        this.customHttpClient.post('PileManage/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close();
            }
        })
    }
    update(obj: object) {
        this.customHttpClient.post('PileManage/Update', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close();
            }
        })
    }
}
