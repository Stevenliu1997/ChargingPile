import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'recharge-program-edit',
    templateUrl: './recharge-program-edit.component.html'
})
export class RechargeProgramEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
