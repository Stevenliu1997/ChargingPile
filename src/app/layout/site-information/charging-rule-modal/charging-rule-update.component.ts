import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';


@Component({
    selector: 'app-charging-rule-update',
    templateUrl: './charging-rule-update.component.html'
})
export class ChargingRuleUpdateComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient,
    ) {}

    confirm() {
        this.update();
    }
    update() {
        const tempObj = this.editModel;
        tempObj.createtime = undefined;
        this.customHttpClient.post('ChargingRule/Update', tempObj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
