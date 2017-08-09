import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-car-brand-edit',
    templateUrl: './car-brand-edit.component.html'
})
export class CarBrandEditComponent {

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
            this.editModel.brandid = -1;
            this.add(this.editModel);
        } else if (this.actionTitle === '编辑') {
            this.update(this.editModel);
        }
    }
    update(obj: object) {
        this.customHttpClient.post('CarBrand/Update', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close();
            }
        })
    }
    add(obj: object) {
        this.customHttpClient.post('CarBrand/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close();
            }
        })
    }
}
