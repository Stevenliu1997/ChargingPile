import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './IC-card-info.component.html'
})
export class ICCardInfoComponent {

    @Input()
    userId: string;
    @Input()
    queryModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

}
