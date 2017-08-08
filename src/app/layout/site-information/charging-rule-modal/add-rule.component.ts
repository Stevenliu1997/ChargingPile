import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-add-rule-aticle',
    templateUrl: './add-rule.component.html'
})
export class AddRuleComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient
    ) {}

    confirm() {
        this.add(this.editModel);
    }
    add(obj: any) {
        this.customHttpClient.post('ChargingRule/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
