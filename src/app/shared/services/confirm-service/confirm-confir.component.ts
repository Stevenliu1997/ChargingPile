import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'confirm-confir',
    templateUrl: './confirm-confir.component.html'
})
export class ConfirmConfirComponent {

    @Input()
    confirmMsg: string;
    @Input()
    options: any;

    inputInfo: string;

    constructor(public activeModal: NgbActiveModal) {}

}
