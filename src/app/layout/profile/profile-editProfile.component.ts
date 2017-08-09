import {Component, Input,ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'profile-editProfile',
    templateUrl: './profile-editProfile.component.html'
})
export class ProfileEditProfileComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    @ViewChild('submitForm')
    editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,private customHttpClient: CustomHttpClient) {
    }

    confirm() {
          if(this.editForm.form.invalid){
            return;
        }
        this.updateProfile(this.editModel);

    }
    updateProfile(profile: object) {
        this.customHttpClient.post('ManageUser/Update', profile).subscribe(result => {
            if(result.code == '00')
                this.activeModal.close();
        },error => {})
    }
}
