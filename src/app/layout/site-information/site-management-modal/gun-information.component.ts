import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-gun-information',
    templateUrl: './gun-information.component.html'
})
export class GunInformationComponent implements OnInit {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient,
    ) {}
    ngOnInit() {
        const tempquery = {
            pileid: ''
        };
        tempquery.pileid = this.editModel.pileid;
        this.customHttpClient.post('ChargeGun/Find', tempquery).subscribe(result => {
            if (result.code === '00') {
                this.editModel.gun1id = result.data[0].gunid;
                this.editModel.gun1sate = result.data[0].gunsate;
                this.editModel.gun2id = result.data[1].gunid;
                this.editModel.gun2sate = result.data[1].gunsate;
                this.editModel.gun3id = result.data[2].gunid;
                this.editModel.gun3sate = result.data[2].gunsate;
                this.editModel.gun4id = result.data[3].gunid;
                this.editModel.gun4sate = result.data[3].gunsate;
            }
        })
    }
}
