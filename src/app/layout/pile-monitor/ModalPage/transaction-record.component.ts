import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';

@Component({
    selector: 'app-transaction-record',
    templateUrl: './transaction-record.component.html'
})
export class TransactionRecordComponent {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    config: object = {
        key: 'none',
        url: 'none/none',
        column: [
            {name: '订单号', key: 'none'},
            {name: '订单状态', key: 'none'},
            {name: '充电时间段', key: 'none'},
            {name: '充电时长', key: 'none'},
            {name: '总电量', key: 'none'},
            {name: '总价格', key: 'none'},
            {name: '支付方式', key: 'none'},
            {name: '用户', key: 'none'},
            {name: '枪ID', key: 'none'}
        ],
        params: function () {
        }.bind(this),
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close(this.editModel);
    }

}
