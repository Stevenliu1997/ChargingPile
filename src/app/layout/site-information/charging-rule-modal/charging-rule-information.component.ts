import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-charging-rule-information',
    templateUrl: './charging-rule-information.component.html'
})
export class ChargingRuleInformationComponent {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        url: 'SiteInformation/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
