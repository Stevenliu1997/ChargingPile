import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'profile-editpassword',
    templateUrl: './profile-editpassword.component.html'
})
export class ProfileEditpasswordComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal, private customHttpClient: CustomHttpClient) {
    }


    confirm() {
        this.activeModal.close(this.editModel);
    }
    value= '';
    pwd= false;
    compare(value: string){
        this.value=value;
        if (this.value !=this.editModel.newpassword)
            this.pwd= true;
        else
            this.pwd= false;
    }
    //比较原密码 TODO
    compare2(oldpassword: object){
        this.customHttpClient.post('User/UpdatePassword', oldpassword).subscribe(result => {
        })
    }

}
