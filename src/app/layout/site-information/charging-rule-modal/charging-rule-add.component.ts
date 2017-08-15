import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-charging-rule-add',
    templateUrl: './charging-rule-add.component.html'
})
export class ChargingRuleAddComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};
    @Input()
    operatorname: string;

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
        this.add(this.editModel);
    }
    add(obj: any) {
        const tempResult = Object.assign({}, obj);
        const date = new Date();
        const time = date.getFullYear() + '-' + (date.getMonth() - 1) + '-' + date.getDate() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        tempResult.createtime = time;
        this.customHttpClient.post('ChargingRule/Add', tempResult).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
