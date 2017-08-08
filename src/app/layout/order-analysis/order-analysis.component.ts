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
        url: 'OrderAnalysis/Find',
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
    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
