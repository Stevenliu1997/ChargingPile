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
    request: any = {};

    config: object = {
        key: 'gunid',
        url: 'Pile/Monitor/Find/TradeRecord',
        column: [
            {name: '订单号', key: 'ordered'},
            {name: '订单状态', key: 'orderstate'},
            {name: '充电开始时间', key: 'startchargetime'},
            {name: '充电结束时间', key: 'endchargetime'},
            {name: '充电时长', key: 'chargetime'},
            {name: '总电量', key: 'chargeamount'},
            {name: '总价格', key: 'payment'},
            {name: '支付方式', key: 'paytype'},
            {name: '用户', key: 'payer'},
            {name: '枪ID', key: 'gunid'}
        ],
        params: function () {
            return this.request;
        }.bind(this),
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    constructor(public activeModal: NgbActiveModal) {}

    confirm() {
        this.activeModal.close();
    }

}
