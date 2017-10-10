import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';
@Component({
    selector: 'app-dockoperator-edit',
    templateUrl: './dockoperator-edit.component.html'
})
export class DockoperatorEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
        state: ""
    };
    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {

        if(this.editForm.form.invalid) {
            return;
        }
        if(this.actionTitle === '添加') {
            this.addOperator(this.editModel);
        }else {
            this.updateOperator(this.editModel);
        }
    }

    updateOperator(operator: object) {
        this.customHttpClient.post('Operator/Update', operator).subscribe(result => {
            if (result.code == '00') {
                this.activeModal.close();
            }
        })
    }

    addOperator(operator: object) {
        let tempObj = Object.assign({}, operator, {operatorid: -1});
        this.customHttpClient.post('Operator/Add', tempObj).subscribe(result => {
            if (result.code == '00') {
                this.activeModal.close();
            }
        })
    }l



}
