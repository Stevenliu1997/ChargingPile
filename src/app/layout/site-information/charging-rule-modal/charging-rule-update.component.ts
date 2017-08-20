import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';


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
    @ViewChild('submitForm')
    editForm: NgForm;
    constructor(
        public activeModal: NgbActiveModal,
        private customHttpClient: CustomHttpClient,
    ) {}

    confirm() {
        if (this.editForm.form.invalid) {
            return;
        }
        this.update();
    }
    update() {
        let tempObj = this.editModel;
        tempObj.createtime = undefined;
        if (tempObj.usersate === 'true') {
            tempObj.usersate = true;
        } else if (tempObj.usersate === 'false') {
            tempObj.usersate = false;
        } else {
            tempObj.usersate = true;
        }
        this.customHttpClient.post('ChargingRule/Update', tempObj).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
