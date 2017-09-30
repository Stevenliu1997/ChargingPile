import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CityService} from "../../../shared/services/city-service/city-service";

@Component({
    selector: 'app-site-information',
    templateUrl: './site-information.component.html'
})
export class SiteInformationComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    citys: any = [];
    areas:  any = [];

    constructor(public activeModal: NgbActiveModal,public cityService: CityService) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
