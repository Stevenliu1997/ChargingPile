import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'profile-editProfile',
    templateUrl: './profile-editProfile.component.html'
})
export class ProfileEditProfileComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {
    }

    confirm() {
        this.activeModal.close(this.editModel);
    }
}
