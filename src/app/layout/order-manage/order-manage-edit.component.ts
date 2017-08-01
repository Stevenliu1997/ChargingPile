import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'order-manage-edit',
    templateUrl: './order-manage-edit.component.html'
})
export class OrderManageEditComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
