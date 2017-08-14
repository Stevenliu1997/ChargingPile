/**
 * Created by mac on 2017/7/27.
 */
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './orderquery-record.component.html'
})
export class OrderQueryRecordComponent {

    @Input()
    account: string;


    constructor(public activeModal: NgbActiveModal) {}

    confirm() {

    }

}
