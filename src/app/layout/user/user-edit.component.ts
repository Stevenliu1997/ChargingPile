/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
        rolename:"",
        lockstate:""
    };

    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {}

    confirm() {

        if(this.editForm.form.invalid){
            return;
        }
        if(this.actionTitle === '添加'){
            this.addUser(this.editModel);
        }else {
            this.updateUser(this.editModel);
        }
    }

    updateUser(user: object){
        this.customHttpClient.post('ManageUser/Update', user).subscribe(result => {
            if(result.code == '00'){
                this.activeModal.close();
            }
        })
    }

    addUser(user: object){
        this.customHttpClient.post('ManageUser/Add', user).subscribe(result => {
            if(result.code == '00'){
                this.activeModal.close();
            }
        })
    }

}
