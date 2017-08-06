import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-order-analysis',
    templateUrl: './order-analysis.component.html',
    styleUrls: ['./order-analysis.component.scss'],
    animations: [routerTransition()]
})
export class OrderAnalysisComponent implements OnInit {
    @ViewChild('orderCount')
    private orderCountComponent: DatagridComponent;
    @ViewChild('chargingCount')
    private chargingCountComponent: DatagridComponent;
    @ViewChild('moneyCount')
    private moneyCountComponent: DatagridComponent;

    queryModel: any = {};

    orderCConfig: object = {
        key: 'orderid',
        url: 'Order/Find',
        column: [
            {name: '日期', key: 'orderdate'},
            {name: '名称', key: 'ordername'},
            {name: '订单数量', key: 'ordernumber'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    chargingCConfig: object = {
        key: 'chargingid',
        url: 'ChargingCount/Find',
        column: [
            {name: '日期', key: 'chargingdata'},
            {name: '名称', key: 'chargingname'},
            {name: '充电量', key: 'chargingnumber'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };
    moneyCConfig: object = {
        key: 'moneyid',
        url: 'MoneyCount/Find',
        column: [
            {name: '日期', key: 'moneydate'},
            {name: '名称', key: 'moneyname'},
            {name: '总价格', key: 'totalprice'},
            {name: '总电费', key: 'totalelectricity'},
            {name: '总服务', key: 'totalservice'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };
    constructor(
        private ngbModal: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    confirm() {

    }
    ngOnInit() {
    }
    beforeChange($event: NgbTabChangeEvent) {
        if ($event.activeId === 'siteManagement') {
            this.chargingclear();
            this.moneyclear();
        } else if ($event.activeId === 'chargingRule') {
            this.orderclear();
            this.moneyclear();
        } else if ($event.activeId === 'articleManagement') {
            this.orderclear();
            this.chargingclear();
        }
    }
    refreshGridOrderC() {
        this.orderCountComponent.refreshGrid();
    }
    refreshGridChargingC() {
        this.chargingCountComponent.refreshGrid();
    }
    refreshGridMoneyC() {
        this.moneyCountComponent.refreshGrid();
    }

    orderclear(): void {
    }
    chargingclear(): void {
    }
    moneyclear(): void {
    }
}
