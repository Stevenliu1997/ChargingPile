
import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'site-create',
    templateUrl: './site-create.component.html'
})
export class SiteCreateComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
