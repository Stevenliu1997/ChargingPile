import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './confirm-confir.component.html'
})
export class ConfirmConfirComponent {

    @Input()
    confirmMsg: string;

    constructor(public activeModal: NgbActiveModal) {}

}
