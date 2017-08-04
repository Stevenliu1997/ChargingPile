import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'provider-edit',
    templateUrl: './provider-edit.component.html'
})
export class ProviderEditComponent {


    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
    };



    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
