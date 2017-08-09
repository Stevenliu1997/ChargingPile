import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'profile-editpassword',
    templateUrl: './profile-editpassword.component.html'
})
export class ProfileEditpasswordComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    @ViewChild('submitForm')
    editForm: NgForm;

    value= '';
    pwd= false;
    newpwd= false;
    errormsg: string;
    //确认密码
    newpassword='';

    constructor(public activeModal: NgbActiveModal, private customHttpClient: CustomHttpClient) {
    }

    confirm() {

        if(this.editForm.form.invalid){
            return;
        }
        if(this.pwd){
            return;
        }
        this.updatePassword(this.editModel);
    }

    //比较两次密码
    compare(value: string){
        this.value=value;
        if (this.value !=this.editModel.newpassword)
            this.pwd= true;
        else
            this.pwd= false;
    }

    updatePassword(password: object){
        this.customHttpClient.post('User/UpdatePassword', password).subscribe(result => {
            if(result.code=='00'){
                this.activeModal.close();
            }else{
                this.errormsg= result.message;
                return;
            }})
    }
}
