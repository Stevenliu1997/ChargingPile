
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'site-delete',
    templateUrl: './site-delete.component.html'
})
export class SiteDeleteComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
