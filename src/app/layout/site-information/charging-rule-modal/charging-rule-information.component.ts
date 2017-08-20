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
        url: 'RuleDetails/Find',
        column: [
            {name: '服务费', key: 'servicecharge'},
            {name: '电价', key: 'price'},
            {name: '开始时间', key: 'starttime'},
            {name: '结束时间', key: 'endtime'}
        ],
        params: function () {
            const tempquery = {
                ruleid: 0
            };
            tempquery.ruleid = this.editModel.ruleid;
            return tempquery;
        }.bind(this),
    };

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
