import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-charging-pile-information',
    templateUrl: './charging-pile-information.component.html'
})
export class ChargingPileInformationComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
        /*powertype: '333',
        voltage: '444',
        current: '555',
        power: '666',
        interfacetype: '777',
        interfacestandard: '888',
        programid: '999',
        manufacturerid: '000'*/
    };

    constructor(public activeModal: NgbActiveModal) {
        console.log(this.editModel);
    }

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
