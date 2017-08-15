import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

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
    /*图标查询数据*/
    chartObj: any = {
        findType: '1',
        timeType: '1',
        starttime: '',
        endtime: ''
    };
    /*存储曲线数组*/
    lineArray: any = [{data: [], label: ''}];
    /*横坐标*/
    lineLabelArray: Array<any> = [];
    /*options*/
    public lineChartOptions: any = {
        responsive: true
    };
    /*colors*/
    public lineChartColors: Array<any> = [
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
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    orderCConfig: object = {
        key: 'orderid',
        url: 'orderform/analyse/form',
        column: [
            {name: '日期', key: 'time'},
            {name: '名称', key: 'objectname'},
            {name: '订单数量', key: 'analyseData'}
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
        private customHttpClient: CustomHttpClient,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    confirm() {

    }
    ngOnInit() {
        this.find();
    }
    beforeChange($event: NgbTabChangeEvent) {
        if ($event.activeId === 'orderstatistics') {
            this.chartObj.findType = '1';
        } else if ($event.activeId === 'chargestatistics') {
            this.chartObj.findType = '2';
        } else if ($event.activeId === 'moneystatistics') {
            this.chartObj.findType = '3';
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

    year() {
        this.chartObj.timeType = '1';
        this.find();
    }
    month() {
        this.chartObj.timeType = '2';
        this.find();
    }
    day() {
        this.chartObj.timeType = '3';
        this.find();
    }
    find() {
        this.customHttpClient.post('orderform/analyse/group', this.chartObj).subscribe(result => {
            if (result.code === '00') {
                for (let i = 0; i < result.data.length; i++) {
                    let tempObj: any = {};
                    tempObj.data = result.data[i].analyseData;
                    tempObj.label = result.data[i].objectname;
                    this.lineArray[i] = tempObj;
                }
                this.lineLabelArray = result.time;
            }
        });
    }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
