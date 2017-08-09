import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'role-edit',
    templateUrl: './role-edit.component.html'
})
export class RoleEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {
        if(this.editForm.form.invalid){
            return;
        }
        if(this.actionTitle === '添加'){
            this.addRole(this.editModel);
        }else {
            this.updateRole(this.editModel);
        }
    }
    addRole(role: object){
        this.customHttpClient.post('Role/Add', role).subscribe(result => {
            if(result.code == '00') {
                this.activeModal.close();
            }
        })
    }
    updateRole(role: object){
        this.customHttpClient.post('Role/Update', role).subscribe(result => {
            if(result.code == '00') {
                this.activeModal.close();
            }
        })
    }

}
