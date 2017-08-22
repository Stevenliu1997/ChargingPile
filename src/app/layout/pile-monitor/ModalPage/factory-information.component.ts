import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-factory-information',
    templateUrl: './factory-information.component.html'
})
export class FactoryInformationComponent implements OnInit {
    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    @Input()
    request: any = {}

    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient
    ) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

    ngOnInit() {
        this.customHttpClient.post('Pile/Monitor/Factory/Find', this.request).subscribe(result => {
            if (result.code === '00') {
                this.editModel = result.Data;
            }
        })
    }
}
